/**
 * 🔌 API ROUTES GENERATOR
 * Auto-generates CRUD API routes for all models
 */

import * as fs from 'fs';
import * as path from 'path';

const modelConfigs = {
  Member: {
    route: 'members',
    fields: ['nik', 'kk', 'fullName', 'gender', 'birthPlace', 'birthDate', 'phone', 'email', 'address', 'maritalStatus', 'hasBaptism', 'familyId'],
    includes: ['family', 'churchGroups', 'baptism']
  },
  Family: {
    route: 'families',
    fields: ['familyHead', 'address', 'phone', 'totalMember'],
    includes: ['members']
  },
  ChurchGroup: {
    route: 'church-groups',
    fields: ['name', 'description'],
    includes: ['members']
  },
  Baptism: {
    route: 'baptisms',
    fields: ['memberId', 'baptismDate', 'baptismPlace', 'minister', 'certificate'],
    includes: ['member']
  },
  Post: {
    route: 'posts',
    fields: ['title', 'slug', 'content', 'cover', 'publishedAt', 'isActive'],
    includes: ['categories']
  },
  Category: {
    route: 'categories',
    fields: ['title', 'slug'],
    includes: ['posts']
  }
};

// Helper to convert to camelCase
function toCamelCase(str: string): string {
  return str.charAt(0).toLowerCase() + str.slice(1);
}

export async function generateApiRoutes(models: string[], projectRoot: string) {
  for (const model of models) {
    if (model === 'User') continue; // Skip User model (handled by auth)
    
    const config = modelConfigs[model as keyof typeof modelConfigs];
    if (!config) continue;

    await generateRouteFile(model, config, projectRoot);
  }
}

function generateRouteFile(model: string, config: any, projectRoot: string) {
  const apiDir = path.join(projectRoot, 'app', 'api', config.route);
  fs.mkdirSync(apiDir, { recursive: true });

  // Generate GET ALL & POST
  const indexContent = generateIndexRoute(model, config);
  fs.writeFileSync(path.join(apiDir, 'route.ts'), indexContent);

  // Generate GET ONE, PUT, DELETE
  const idDir = path.join(apiDir, '[id]');
  fs.mkdirSync(idDir, { recursive: true });
  const idContent = generateIdRoute(model, config);
  fs.writeFileSync(path.join(idDir, 'route.ts'), idContent);
}

function generateIndexRoute(model: string, config: any): string {
  const modelLower = toCamelCase(model);
  const includeClause = config.includes.length > 0 
    ? `include: { ${config.includes.map((inc: string) => `${inc}: true`).join(', ')} }` 
    : '';

  return `import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

// GET /api/${config.route} - Get all ${model}s
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;

    const [data, total] = await Promise.all([
      prisma.${modelLower}.findMany({
        where: { deletedAt: null },
        ${includeClause},
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' }
      }),
      prisma.${modelLower}.count({ where: { deletedAt: null } })
    ]);

    return NextResponse.json({
      data,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    console.error('Error fetching ${model}s:', error);
    return NextResponse.json(
      { error: 'Failed to fetch ${model}s' },
      { status: 500 }
    );
  }
}

// POST /api/${config.route} - Create ${model}
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const body = await request.json();
    
    const ${modelLower} = await prisma.${modelLower}.create({
      data: {
        ...body,
        createdBy: session.user.id
      },
      ${includeClause}
    });

    return NextResponse.json(${modelLower}, { status: 201 });
  } catch (error) {
    console.error('Error creating ${model}:', error);
    return NextResponse.json(
      { error: 'Failed to create ${model}' },
      { status: 500 }
    );
  }
}
`;
}

function generateIdRoute(model: string, config: any): string {
  const modelLower = toCamelCase(model);
  const includeClause = config.includes.length > 0 
    ? `include: { ${config.includes.map((inc: string) => `${inc}: true`).join(', ')} }` 
    : '';

  return `import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

// GET /api/${config.route}/[id] - Get single ${model}
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const ${modelLower} = await prisma.${modelLower}.findUnique({
      where: { id },
      ${includeClause}
    });

    if (!${modelLower} || ${modelLower}.deletedAt) {
      return NextResponse.json({ error: '${model} not found' }, { status: 404 });
    }

    return NextResponse.json(${modelLower});
  } catch (error) {
    console.error('Error fetching ${model}:', error);
    return NextResponse.json(
      { error: 'Failed to fetch ${model}' },
      { status: 500 }
    );
  }
}

// PUT /api/${config.route}/[id] - Update ${model}
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const { id } = await params;
    const body = await request.json();
    
    const ${modelLower} = await prisma.${modelLower}.update({
      where: { id },
      data: {
        ...body,
        updatedBy: session.user.id,
        updatedAt: new Date()
      },
      ${includeClause}
    });

    return NextResponse.json(${modelLower});
  } catch (error) {
    console.error('Error updating ${model}:', error);
    return NextResponse.json(
      { error: 'Failed to update ${model}' },
      { status: 500 }
    );
  }
}

// DELETE /api/${config.route}/[id] - Soft delete ${model}
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const { id } = await params;
    await prisma.${modelLower}.update({
      where: { id },
      data: {
        deletedAt: new Date(),
        deletedBy: session.user.id
      }
    });

    return NextResponse.json({ message: '${model} deleted successfully' });
  } catch (error) {
    console.error('Error deleting ${model}:', error);
    return NextResponse.json(
      { error: 'Failed to delete ${model}' },
      { status: 500 }
    );
  }
}
`;
}

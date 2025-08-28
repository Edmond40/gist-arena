import { PrismaClient } from '@prisma/client';
import 'dotenv/config';

const prisma = new PrismaClient();

async function debugDatabase() {
  try {
    console.log('=== Database Debug Info ===');
    
    // Check users
    const users = await prisma.user.findMany({
      select: { id: true, email: true, name: true, role: true }
    });
    console.log('Users in database:', users);
    
    // Check posts
    const posts = await prisma.post.findMany({
      select: { id: true, title: true, authorId: true }
    });
    console.log('Posts in database:', posts);
    
    // Check likes
    const likes = await prisma.like.findMany();
    console.log('Likes in database:', likes);
    
    // Check bookmarks
    const bookmarks = await prisma.bookmark.findMany();
    console.log('Bookmarks in database:', bookmarks);
    
  } catch (error) {
    console.error('Database error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

debugDatabase();

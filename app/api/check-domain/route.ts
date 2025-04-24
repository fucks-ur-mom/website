import { NextResponse } from "next/server";
import { DomainCheckResponse } from "@/lib/types";

// Hardcoded list of reserved domains

// Update the reserved domains list and validation
const reservedDomains = [
  'www',
  'mail',
  'admin',
  'blog',
  'shop',
  'api',
  'ftp',
  'webmail',
  'panel',
  'devmatei' // Add your own reserved names here
];

export async function POST(req: Request) {
  try {
    const { subdomain } = await req.json();

    // Validate subdomain format
    if (!/^[a-z0-9-]+$/.test(subdomain)) {
      return NextResponse.json(
        { error: "Only lowercase letters, numbers, and hyphens allowed" },
        { status: 400 }
      );
    }

    // Check if file exists using raw GitHub URL
    const rawUrl = `https://raw.githubusercontent.com/fucks-ur-mom/register/main/domains/${subdomain}.json`;
    const response = await fetch(rawUrl);
    
    return NextResponse.json({
      available: response.status === 404,
      error: response.status === 200 ? "Subdomain already registered" : null
    });

  } catch (error) {
    return NextResponse.json(
      { error: "Error checking domain availability" },
      { status: 500 }
    );
  }
}
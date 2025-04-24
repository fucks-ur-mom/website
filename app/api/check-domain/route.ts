import { NextResponse } from "next/server";
import { DomainCheckResponse } from "@/lib/types";

// Hardcoded list of reserved domains


export async function POST(req: Request) {
  // Check request method
  if (req.method !== 'POST') {
    return NextResponse.json(
      { error: "Method not allowed" },
      { status: 405 }
    );
  }

  try {
    // Handle static rendering during build
    if (process.env.NODE_ENV === 'production') {
      return NextResponse.json(
        { error: "This endpoint requires a POST request" },
        { status: 405 }
      );
    }

    const { subdomain } = await req.json();

    if (!subdomain) {
      return NextResponse.json(
        { error: "Subdomain is required" },
        { status: 400 }
      );
    }

    // Validate subdomain format
    const subdomainRegex = /^[a-z0-9][a-z0-9-]*[a-z0-9]$/;
    if (!subdomainRegex.test(subdomain)) {
      return NextResponse.json(
        {
          error:
            "Subdomain must contain only lowercase letters, numbers, and hyphens, and cannot start or end with a hyphen",
        },
        { status: 400 }
      );
    }

    // Fetch domains from GitHub repository
    const githubResponse = await fetch('https://api.github.com/repos/fucks-ur-mom/register/contents/domains');
    
    if (!githubResponse.ok) {
      console.error('GitHub API error:', await githubResponse.text());
      return NextResponse.json(
        { error: "Failed to check domain availability" },
        { status: 500 }
      );
    }
    
    const files = await githubResponse.json();
    const existingDomains = files.map((file: any) => file.name.replace('.json', ''));
    const available = !existingDomains.includes(subdomain.toLowerCase());

    return NextResponse.json({ available });
  } catch (error) {
    console.error("Domain check error:", error);
    return NextResponse.json(
      { error: "Failed to check domain availability" },
      { status: 500 }
    );
  }
}
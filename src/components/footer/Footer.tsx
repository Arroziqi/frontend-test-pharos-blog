"use client";

import React from "react";
import { Copyright } from "@/components/footer/Copyright";
import { Typography } from "@/components/Typography";
import Link from "next/link";
import { profile } from "@/content/profile";
import { colorTheme } from "@/components/style-guide/colorTheme";
import { NAV_LINKS } from "@/components/navbar/Navbar";
import { category } from "@/content/category";

function Footer() {
  return (
    <footer className={"p-4 mt-10 xl:p-8 xl:mt-20"}>
      <div className="xl:grid xl:grid-cols-3 xl:gap-4">
        <div className="">
          <Typography>About</Typography>
          <Typography
            className={"max-w-[90%]"}
            style={{ color: colorTheme.dark.secondary400 }}
          >
            This blog is a collection of my web development projects, tutorials,
            and insights into modern technologies. Here, I share practical tips,
            coding techniques, and lessons learned from real-world projects to
            help other developers and enthusiasts improve their skills and
            understanding of web development.
          </Typography>
          <br />
          <Typography>
            Website:{" "}
            <Link
              style={{ color: colorTheme.dark.secondary400 }}
              href={profile.socials.website.href}
            >
              {profile.socials.website.label}
            </Link>
          </Typography>
          <Typography>
            Phone:{" "}
            <Link
              style={{ color: colorTheme.dark.secondary400 }}
              href={profile.socials.whatsapp.href}
            >
              {profile.socials.whatsapp.label}
            </Link>
          </Typography>
        </div>

        <div className="hidden xl:grid grid-cols-2 gap-2">
          <div className="flex flex-col gap-4">
            <Typography>Quick Links</Typography>

            <div className="flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <Link href={link.href} key={link.href}>
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <Typography>Category</Typography>

            <div className="flex flex-col gap-1">
              {category.map((link) => (
                <Link href={link.href} key={link.name}>
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Copyright withDivider={true} />
    </footer>
  );
}

export default Footer;

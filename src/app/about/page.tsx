"use client";

import React from "react";
import MainContainer from "@/components/container/MainContainer";
import { AboutAuthor } from "@/components/AboutAuthor";
import { profile } from "@/content/profile";

export default function AboutPage() {
  return (
    <MainContainer className="flex flex-col gap-6 px-4 py-10 xl:py-20">
      {/* About author */}
      <AboutAuthor
        name={profile.name}
        role={profile.role}
        avatar={profile.avatar}
        bio={profile.bioLong}
        socials={profile.socials}
        location={profile.location}
        variants={"full"}
      />
    </MainContainer>
  );
}

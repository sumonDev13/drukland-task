import Link from "next/link";

export default function Footer() {
    return (
      <div className="py-3">
        <div className="container">
          <div className="lg:flex justify-between items-center border-t border-[#292929] pt-2">
            <div>
                <p>All rights reserved © 2024  | Drukland.de</p>
            </div>
            <div className="flex lg:gap-5 gap-3">
                <Link href={"/"}>Terms of Use</Link>
                <Link href={"/"}>Sitemap</Link>
                <Link href={"/"}>Company information</Link>
                <Link href={"/"}>Cookie settings</Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
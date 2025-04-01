import React from "react";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import { Link } from "react-router-dom";
import {
  Facebook,
  Instagram,
  ExternalLink,
  Mail,
  Phone,
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contacts" className="bg-slate-900 text-white py-12 px-4 md:px-8 lg:px-12 w-full">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">BrickByBrick</h3>
            <p className="text-slate-300 mb-4">
              Il vostro partner di fiducia nel settore immobiliare.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Vai a</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/properties"
                  className="text-slate-300 hover:text-white transition-colors"
                >
                  Proprietà
                </Link>
              </li>
              <li>
                <Link
                  to="/chi-siamo"
                  className="text-slate-300 hover:text-white transition-colors"
                >
                  Chi siamo
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-slate-300 hover:text-white transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contattaci</h3>
            <ul className="space-y-3">
              <li className="flex items-center">
                <Phone className="mr-2 h-5 w-5 text-slate-400" />
                <span className="text-slate-300">+39 340 352 4759</span>
              </li>
              <li className="flex items-center">
                <Mail className="mr-2 h-5 w-5 text-slate-400" />
                <span className="text-slate-300">brickbybrickk2024@gmail.com</span>
              </li>
            </ul>
            <div className="mt-4">
              <h3 className="text-lg font-medium mb-2">Seguici su:</h3>
              <div className="flex space-x-4">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:text-white hover:bg-slate-800"
                  asChild
                >
                  <a
                    href="https://www.facebook.com/profile.php?id=61572036686982"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Visit our Facebook page"
                  >
                    <Facebook size={20} />
                  </a>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:text-white hover:bg-slate-800"
                  asChild
                >
                  <a
                    href="https://www.instagram.com/brick.by.brick_immobiliare?igsh=NWRlMm5lZnQ5NWJ1"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Visit our Instagram page"
                  >
                    <Instagram size={20} />
                  </a>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:text-white hover:bg-slate-800"
                  asChild
                >
                  <a
                    href="https://www.immobiliare.it/agenzie-immobiliari/442331/brick-by-brick-san-carlo-canavese/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Visit our Immobiliare.it page"
                  >
                    <ExternalLink size={20} />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-slate-700" />

        <div className="w-full flex justify-center mb-8">
          <Button
            size="lg"
            className="bg-white text-slate-900 hover:bg-white/90"
            onClick={() => window.open('https://tally.so/r/w2lZMV', '_blank')}
          >
            Contattaci
          </Button>
        </div>

        <div className="flex flex-col md:flex-row justify-center items-center">
          <p className="text-slate-400 text-sm">
            {currentYear} BrickByBrick. Tutti i diritti riservati.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

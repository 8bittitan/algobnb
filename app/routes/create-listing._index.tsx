import { Link } from "@remix-run/react";

import { Button } from "~/components/ui/button";

export default function CreateListing() {
  return (
    <>
      <div className="grid grid-cols-2 gap-16 px-12 py-60">
        <div className="flex items-center justify-center">
          <h2 className="max-w-xl text-6xl font-bold">
            Let{"'"}s get your listing out in the world
          </h2>
        </div>
        <div>
          <div className="flex border-b-2 border-b-secondary py-8">
            <div className="pr-4">
              <strong className="text-3xl">1</strong>
            </div>
            <div>
              <strong className="text-3xl">Tell us about your place</strong>
              <p className="mt-2 text-lg">
                Just some basic info helps potential renters find your place.
              </p>
            </div>
          </div>

          <div className="flex border-b-2 border-b-secondary py-8">
            <div className="pr-4">
              <strong className="text-3xl">2</strong>
            </div>
            <div>
              <strong className="text-3xl">
                Then highlight the important parts
              </strong>
              <p className="mt-2 text-lg">
                Nifty room? A pool? Nicer amenities helps your listing stand
                out.
              </p>
            </div>
          </div>

          <div className="flex py-8">
            <div className="pr-4">
              <strong className="text-3xl">3</strong>
            </div>
            <div>
              <strong className="text-3xl">
                Then take the last step and publish
              </strong>
              <p className="mt-2 text-lg">
                Choose a few last things to help ease renters selecting your
                place.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 flex items-center justify-between bg-secondary px-8 py-4">
        <Button asChild variant="outline">
          <Link to="/">Exit</Link>
        </Button>
        <Button asChild>
          <Link to="/create-listing/info">Get started</Link>
        </Button>
      </div>
    </>
  )
}

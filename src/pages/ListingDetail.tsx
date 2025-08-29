import React from "react";
import { useParams } from "react-router-dom";
import Layout from "@/components/Layout";

export default function ListingDetail() {
  const { id } = useParams();
  return (
    <Layout>
      <section className="py-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="rounded-2xl overflow-hidden border bg-card aspect-[16/10]" />
          <div>
            <h1 className="text-3xl font-bold">Item #{id}</h1>
            <p className="mt-2 text-muted-foreground">
              Product description, specs, and live bid stream go here.
            </p>
            <div className="mt-6 flex items-center gap-3">
              <button className="rounded-xl bg-primary px-5 py-3 text-primary-foreground font-semibold shadow-soft">
                Place Bid
              </button>
              <span className="text-sm text-muted-foreground">Current: $0.01</span>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

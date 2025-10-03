import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DROPS } from "@/data/mockStoreData";
import { DropCard } from "@/components/drops/DropCard";

export default function DropsPage() {
  const [activeTab, setActiveTab] = useState("live");

  const upcomingDrops = DROPS.filter((d) => d.status === "upcoming");
  const liveDrops = DROPS.filter((d) => d.status === "live");
  const pastDrops = DROPS.filter((d) => d.status === "past");

  return (
    <div className="min-h-screen bg-snag-gradient">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-black text-white hero-glow mb-2">
            Exclusive Drops
          </h1>
          <p className="text-white/70 text-lg">
            Limited collaborations, exclusive releases, and special auctions
          </p>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-3 bg-white/5 border border-white/10 mb-8">
            <TabsTrigger
              value="live"
              className="data-[state=active]:bg-[#00FF80] data-[state=active]:text-black font-semibold"
            >
              Live ({liveDrops.length})
            </TabsTrigger>
            <TabsTrigger
              value="upcoming"
              className="data-[state=active]:bg-[#00FF80] data-[state=active]:text-black font-semibold"
            >
              Upcoming ({upcomingDrops.length})
            </TabsTrigger>
            <TabsTrigger
              value="past"
              className="data-[state=active]:bg-[#00FF80] data-[state=active]:text-black font-semibold"
            >
              Past ({pastDrops.length})
            </TabsTrigger>
          </TabsList>

          {/* Live Drops */}
          <TabsContent value="live" className="mt-8">
            {liveDrops.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {liveDrops.map((drop) => (
                  <DropCard key={drop.id} drop={drop} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white/5 rounded-2xl border border-white/10">
                <p className="text-white/50 text-lg">No live drops at the moment</p>
                <p className="text-white/40 text-sm mt-2">Check back soon for new releases</p>
              </div>
            )}
          </TabsContent>

          {/* Upcoming Drops */}
          <TabsContent value="upcoming" className="mt-8">
            {upcomingDrops.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {upcomingDrops.map((drop) => (
                  <DropCard key={drop.id} drop={drop} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white/5 rounded-2xl border border-white/10">
                <p className="text-white/50 text-lg">No upcoming drops scheduled</p>
                <p className="text-white/40 text-sm mt-2">Follow us for announcements</p>
              </div>
            )}
          </TabsContent>

          {/* Past Drops */}
          <TabsContent value="past" className="mt-8">
            {pastDrops.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pastDrops.map((drop) => (
                  <DropCard key={drop.id} drop={drop} />
                ))}
              </div>
            ) : (
              <div className="text-center py-20 bg-white/5 rounded-2xl border border-white/10">
                <p className="text-white/50 text-lg">No past drops</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

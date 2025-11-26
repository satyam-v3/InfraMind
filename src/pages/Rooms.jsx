import { useState } from "react";
import { Building2, Search, Download, Thermometer, Droplets, Users } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const rooms = [
  { id: 1, name: "Room 101", building: "A", floor: 1, capacity: 50, occupancy: 42, temp: 22, humidity: 45, status: "active" },
  { id: 2, name: "Room 102", building: "A", floor: 1, capacity: 30, occupancy: 18, temp: 23, humidity: 48, status: "active" },
  { id: 3, name: "Room 201", building: "A", floor: 2, capacity: 60, occupancy: 55, temp: 24, humidity: 50, status: "warning" },
  { id: 4, name: "Lab 301", building: "B", floor: 3, capacity: 40, occupancy: 5, temp: 21, humidity: 42, status: "active" },
  { id: 5, name: "Auditorium", building: "C", floor: 1, capacity: 200, occupancy: 0, temp: 20, humidity: 40, status: "idle" },
  { id: 6, name: "Room 401", building: "B", floor: 4, capacity: 35, occupancy: 32, temp: 25, humidity: 52, status: "warning" },
];

export default function Rooms() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRoom, setSelectedRoom] = useState(rooms[0]);

  const filteredRooms = rooms.filter(room =>
    room.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    room.building.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch (status) {
      case "active": return "success";
      case "warning": return "warning";
      case "idle": return "secondary";
      default: return "default";
    }
  };

  const occupancyPercentage = Math.round((selectedRoom.occupancy / selectedRoom.capacity) * 100);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Room Management</h1>
          <p className="text-muted-foreground">Monitor and manage all campus rooms</p>
        </div>

        <Button className="gap-2">
          <Download className="h-4 w-4" /> Export Data
        </Button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        
        {/* LEFT PANEL */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-lg">All Rooms</CardTitle>
            <div className="relative">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />

              <Input
                placeholder="Search rooms..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-8"
              />
            </div>
          </CardHeader>

          <CardContent className="space-y-2 max-h-[600px] overflow-y-auto">
            {filteredRooms.map((room) => (
              <div
                key={room.id}
                onClick={() => setSelectedRoom(room)}
                className={`p-3 rounded-lg cursor-pointer transition-colors ${
                  selectedRoom.id === room.id
                    ? "bg-primary/10 border border-primary"
                    : "bg-muted/50 hover:bg-muted"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">{room.name}</span>
                  </div>

                  <Badge variant={getStatusColor(room.status)}>
                    {room.status}
                  </Badge>
                </div>

                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>Building {room.building}</span>
                  <span>{room.occupancy}/{room.capacity}</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* RIGHT PANEL */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>{selectedRoom.name}</CardTitle>
                <CardDescription>
                  Building {selectedRoom.building} - Floor {selectedRoom.floor}
                </CardDescription>
              </div>
              <Badge variant={getStatusColor(selectedRoom.status)} className="px-3 py-1">
                {selectedRoom.status}
              </Badge>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">

            {/* STATS GRID */}
            <div className="grid gap-4 md:grid-cols-3">
              
              {/* OCCUPANCY CARD */}
              <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-primary/20">
                    <Users className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-sm font-medium text-muted-foreground">Occupancy</span>
                </div>

                <p className="text-2xl font-bold">{occupancyPercentage}%</p>
                <p className="text-sm text-muted-foreground mt-1">
                  {selectedRoom.occupancy} / {selectedRoom.capacity} people
                </p>

                <Progress value={occupancyPercentage} className="h-2 mt-3" />
              </div>

              {/* TEMP CARD */}
              <div className="p-4 rounded-lg bg-accent/10 border border-accent/20">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-accent/20">
                    <Thermometer className="h-4 w-4 text-accent" />
                  </div>
                  <span className="text-sm font-medium text-muted-foreground">Temperature</span>
                </div>

                <p className="text-2xl font-bold">{selectedRoom.temp}°C</p>
                <p className="text-sm text-success mt-1">Normal range</p>
              </div>

              {/* HUMIDITY CARD */}
              <div className="p-4 rounded-lg bg-success/10 border border-success/20">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-success/20">
                    <Droplets className="h-4 w-4 text-success" />
                  </div>
                  <span className="text-sm font-medium text-muted-foreground">Humidity</span>
                </div>

                <p className="text-2xl font-bold">{selectedRoom.humidity}%</p>
                <p className="text-sm text-success mt-1">Optimal level</p>
              </div>
            </div>

            {/* CHART PLACEHOLDER */}
            <div>
              <h3 className="font-semibold mb-4">Sensor Trends (Last 24h)</h3>

              <div className="h-64 bg-muted/50 rounded-lg flex items-center justify-center">
                <p className="text-muted-foreground">
                  Chart visualization would go here
                </p>
              </div>
            </div>

            {/* USAGE PATTERNS */}
            <div>
              <h3 className="font-semibold mb-3">Usage Patterns</h3>

              <div className="space-y-3">
                {[
                  ["Peak hours", "9:00 AM - 12:00 PM"],
                  ["Average occupancy", "68%"],
                  ["Most active day", "Wednesday"],
                ].map(([label, value], i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                    <span className="text-sm">{label}</span>
                    <span className="text-sm font-medium">{value}</span>
                  </div>
                ))}
              </div>
            </div>

          </CardContent>
        </Card>
      </div>
    </div>
  );
}

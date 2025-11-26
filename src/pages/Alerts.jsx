import { AlertTriangle, CheckCircle, Clock, TrendingUp } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const activeAlerts = [
  { id: 1, title: "High occupancy in Room 301", severity: "high", time: "5 min ago", location: "Building A" },
  { id: 2, title: "Temperature spike detected", severity: "medium", time: "15 min ago", location: "Building B" },
  { id: 3, title: "Humidity level below threshold", severity: "low", time: "1 hour ago", location: "Lab 201" },
  { id: 4, title: "Sensor connectivity issue", severity: "high", time: "2 hours ago", location: "Building C" },
];

const predictions = [
  { id: 1, type: "occupancy", value: "85%", location: "Room 101", timeframe: "Next 2 hours", confidence: 92 },
  { id: 2, type: "occupancy", value: "62%", location: "Library", timeframe: "Tomorrow 10 AM", confidence: 88 },
  { id: 3, type: "energy", value: "High usage", location: "Building A", timeframe: "This evening", confidence: 95 },
];

export default function Alerts() {
  const getSeverityColor = (severity) => {
    switch (severity) {
      case "high": return "destructive";
      case "medium": return "warning";
      case "low": return "secondary";
      default: return "default";
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Alerts & Predictions</h1>
        <p className="text-muted-foreground">Monitor system alerts and AI-powered predictions</p>
      </div>

      <Tabs defaultValue="alerts" className="space-y-6">
        <TabsList>
          <TabsTrigger value="alerts">Active Alerts</TabsTrigger>
          <TabsTrigger value="predictions">Predictions</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>

        <TabsContent value="alerts" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="bg-gradient-to-br from-destructive/10 to-destructive/5 border-destructive/20">
              <CardHeader>
                <CardTitle className="text-2xl">4</CardTitle>
                <CardDescription>High Priority</CardDescription>
              </CardHeader>
            </Card>
            <Card className="bg-gradient-to-br from-warning/10 to-warning/5 border-warning/20">
              <CardHeader>
                <CardTitle className="text-2xl">12</CardTitle>
                <CardDescription>Medium Priority</CardDescription>
              </CardHeader>
            </Card>
            <Card className="bg-gradient-to-br from-success/10 to-success/5 border-success/20">
              <CardHeader>
                <CardTitle className="text-2xl">7</CardTitle>
                <CardDescription>Low Priority</CardDescription>
              </CardHeader>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Active Alerts</CardTitle>
              <CardDescription>Requiring attention</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {activeAlerts.map((alert) => (
                <div key={alert.id} className="p-4 rounded-lg border bg-card">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-start gap-3 flex-1">
                      <AlertTriangle
                        className={`h-5 w-5 mt-0.5 ${
                          alert.severity === "high"
                            ? "text-destructive"
                            : alert.severity === "medium"
                            ? "text-warning"
                            : "text-muted-foreground"
                        }`}
                      />
                      <div className="flex-1">
                        <h3 className="font-medium">{alert.title}</h3>
                        <div className="flex items-center gap-3 mt-2 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {alert.time}
                          </span>
                          <span>{alert.location}</span>
                        </div>
                      </div>
                    </div>
                    <Badge variant={getSeverityColor(alert.severity)}>
                      {alert.severity}
                    </Badge>
                  </div>
                  <div className="flex gap-2 mt-3">
                    <Button size="sm" variant="outline">View Details</Button>
                    <Button size="sm">Acknowledge</Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="predictions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>AI-Powered Predictions</CardTitle>
              <CardDescription>Forecasts based on historical data and patterns</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {predictions.map((p) => (
                <div key={p.id} className="p-4 rounded-lg border bg-gradient-to-r from-primary/5 to-accent/5">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1">
                      <TrendingUp className="h-5 w-5 text-primary mt-0.5" />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-medium capitalize">{p.type} Prediction</h3>
                          <Badge variant="outline" className="text-xs">
                            {p.confidence}% confidence
                          </Badge>
                        </div>
                        <p className="text-2xl font-bold text-primary mb-2">{p.value}</p>
                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                          <span>{p.location}</span>
                          <span>•</span>
                          <span>{p.timeframe}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Prediction Accuracy</CardTitle>
              <CardDescription>Model performance over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-64 bg-muted/50 rounded-lg flex items-center justify-center">
                <p className="text-muted-foreground">Accuracy chart would go here</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Alert History</CardTitle>
              <CardDescription>Past 30 days</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                { title: "Power outage resolved", time: "2 days ago" },
                { title: "HVAC maintenance completed", time: "3 days ago" },
                { title: "Network connectivity restored", time: "5 days ago" },
              ].map((item, i) => (
                <div key={i} className="p-3 rounded-lg bg-muted/50 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <CheckCircle className="h-4 w-4 text-success" />
                    <div>
                      <p className="font-medium">{item.title}</p>
                      <p className="text-sm text-muted-foreground">{item.time}</p>
                    </div>
                  </div>
                  <Badge variant="outline">Resolved</Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

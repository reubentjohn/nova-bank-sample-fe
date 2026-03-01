import { useState, useEffect, useCallback } from "react";
import Dashboard from "../components/Dashboard";
import DemoControls from "../components/DemoControls";
import { fetchFeatures } from "../api/client";
import type { FeatureConfig, UserType, Environment } from "../api/types";

function LoadingSkeleton() {
  return (
    <div className="min-h-screen p-6 md:p-10 max-w-5xl mx-auto space-y-6 animate-pulse">
      <div className="space-y-3 mb-8">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-secondary" />
          <div className="w-20 h-3 rounded bg-secondary" />
        </div>
        <div className="w-72 h-8 rounded bg-secondary" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-48 rounded-xl bg-secondary/50" />
        ))}
      </div>
    </div>
  );
}

export default function Index() {
  const [userType, setUserType] = useState<UserType>("standard");
  const [environment, setEnvironment] = useState<Environment>("staging");
  const [config, setConfig] = useState<FeatureConfig | null>(null);
  const [loading, setLoading] = useState(true);

  const loadFeatures = useCallback(async () => {
    setLoading(true);
    try {
      const data = await fetchFeatures(userType, environment);
      setConfig(data);
    } catch (err) {
      console.error("Failed to fetch features:", err);
    }
    setLoading(false);
  }, [userType, environment]);

  useEffect(() => {
    loadFeatures();
  }, [loadFeatures]);

  return (
    <div className="min-h-screen bg-background">
      {loading || !config ? (
        <LoadingSkeleton />
      ) : (
        <Dashboard config={config} userType={userType} environment={environment} />
      )}
      <DemoControls
        userType={userType}
        environment={environment}
        onUserTypeChange={setUserType}
        onEnvironmentChange={setEnvironment}
        config={config}
      />
    </div>
  );
}

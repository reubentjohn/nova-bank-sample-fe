import type { FeatureConfig, UserType, Environment } from "../api/types";
import BalanceWidget from "./widgets/BalanceWidget";
import TransactionsWidget from "./widgets/TransactionsWidget";
import LoanWidget from "./widgets/LoanWidget";
import PromoWidget from "./widgets/PromoWidget";

interface Props {
  config: FeatureConfig;
  userType: UserType;
  environment: Environment;
}

const widgetMap: Record<string, string> = {
  balance: "balance",
  transactions: "transactions",
  loans: "loans",
  promo: "promo",
};

export default function Dashboard({ config, userType, environment }: Props) {
  const { dashboard, loan } = config;
  const isCard = dashboard.widget_style === "card";

  const renderWidget = (key: string, index: number) => {
    switch (key) {
      case "balance":
        return <BalanceWidget key={`balance-${index}`} style={dashboard.widget_style} />;
      case "transactions":
        return <TransactionsWidget key={`txn-${index}`} style={dashboard.widget_style} />;
      case "loans":
        return <LoanWidget key={`loan-${index}`} style={dashboard.widget_style} config={loan} userType={userType} environment={environment} />;
      case "promo":
        return dashboard.show_promo_banner ? (
          <PromoWidget key={`promo-${index}`} style={dashboard.widget_style} promoCopy={dashboard.promo_copy} userType={userType} environment={environment} />
        ) : null;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen p-6 md:p-10 max-w-5xl mx-auto space-y-6">
      {/* Header */}
      <div className="space-y-1 mb-8">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-8 rounded-lg teal-gradient flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">N</span>
          </div>
          <span className="text-sm font-semibold tracking-wider uppercase text-muted-foreground">Nova Bank</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-display font-semibold tracking-tight">
          {dashboard.hero_copy}
        </h1>
      </div>

      {/* Widgets */}
      {isCard ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {dashboard.widget_order.map((key, i) => renderWidget(key, i))}
        </div>
      ) : (
        <div className="glass-panel-strong divide-y divide-border/30 overflow-hidden">
          {dashboard.widget_order.map((key, i) => renderWidget(key, i))}
        </div>
      )}
    </div>
  );
}

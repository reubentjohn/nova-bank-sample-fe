import { FeatureConfig, UserType, Environment } from "./types";

type ConfigMap = Record<Environment, Record<UserType, FeatureConfig>>;

const configs: ConfigMap = {
  development: {
    new: {
      dashboard: {
        enabled: true,
        widget_order: ["balance", "promo", "loans", "transactions"],
        widget_style: "card",
        hero_copy: "Welcome to Nova Bank ✨",
        show_promo_banner: true,
        promo_copy: "Open your first savings account and earn 5% APY",
      },
      loan: {
        enabled: true,
        algo_variant: "aggressive",
        max_loan_amount: 15000,
        rate_label: "Introductory Rate",
        risk_tier: "low",
      },
    },
    standard: {
      dashboard: {
        enabled: true,
        widget_order: ["balance", "loans", "promo", "transactions"],
        widget_style: "card",
        hero_copy: "Your financial snapshot",
        show_promo_banner: true,
        promo_copy: "You qualify for our premium loan rate",
      },
      loan: {
        enabled: true,
        algo_variant: "aggressive",
        max_loan_amount: 40000,
        rate_label: "Premium Rate",
        risk_tier: "high",
      },
    },
    premium: {
      dashboard: {
        enabled: true,
        widget_order: ["balance", "loans", "transactions", "promo"],
        widget_style: "card",
        hero_copy: "Welcome back, valued member",
        show_promo_banner: true,
        promo_copy: "Exclusive: Private lending at 2.9% APR",
      },
      loan: {
        enabled: true,
        algo_variant: "conservative",
        max_loan_amount: 100000,
        rate_label: "Private Rate",
        risk_tier: "low",
      },
    },
  },
  staging: {
    new: {
      dashboard: {
        enabled: true,
        widget_order: ["balance", "transactions", "loans", "promo"],
        widget_style: "card",
        hero_copy: "Start your journey with Nova",
        show_promo_banner: true,
        promo_copy: "New customer bonus: $50 when you deposit $500",
      },
      loan: {
        enabled: true,
        algo_variant: "moderate",
        max_loan_amount: 10000,
        rate_label: "Standard Rate",
        risk_tier: "medium",
      },
    },
    standard: {
      dashboard: {
        enabled: true,
        widget_order: ["balance", "loans", "promo", "transactions"],
        widget_style: "card",
        hero_copy: "Your financial snapshot",
        show_promo_banner: true,
        promo_copy: "You qualify for our premium loan rate",
      },
      loan: {
        enabled: true,
        algo_variant: "aggressive",
        max_loan_amount: 40000,
        rate_label: "Premium Rate",
        risk_tier: "high",
      },
    },
    premium: {
      dashboard: {
        enabled: true,
        widget_order: ["balance", "loans", "transactions", "promo"],
        widget_style: "card",
        hero_copy: "Welcome back, valued member",
        show_promo_banner: true,
        promo_copy: "Exclusive: Private lending at 2.9% APR",
      },
      loan: {
        enabled: true,
        algo_variant: "conservative",
        max_loan_amount: 75000,
        rate_label: "Private Rate",
        risk_tier: "low",
      },
    },
  },
  production: {
    new: {
      dashboard: {
        enabled: true,
        widget_order: ["balance", "transactions", "loans"],
        widget_style: "list",
        hero_copy: "Your Nova Bank Dashboard",
        show_promo_banner: false,
        promo_copy: "",
      },
      loan: {
        enabled: true,
        algo_variant: "conservative",
        max_loan_amount: 5000,
        rate_label: "Standard Rate",
        risk_tier: "low",
      },
    },
    standard: {
      dashboard: {
        enabled: true,
        widget_order: ["balance", "transactions", "loans"],
        widget_style: "list",
        hero_copy: "Your Nova Bank Dashboard",
        show_promo_banner: false,
        promo_copy: "",
      },
      loan: {
        enabled: true,
        algo_variant: "conservative",
        max_loan_amount: 20000,
        rate_label: "Standard Rate",
        risk_tier: "medium",
      },
    },
    premium: {
      dashboard: {
        enabled: true,
        widget_order: ["balance", "transactions", "loans"],
        widget_style: "list",
        hero_copy: "Your Nova Bank Dashboard",
        show_promo_banner: false,
        promo_copy: "",
      },
      loan: {
        enabled: true,
        algo_variant: "conservative",
        max_loan_amount: 50000,
        rate_label: "Preferred Rate",
        risk_tier: "low",
      },
    },
  },
};

export function getMockFeatures(userType: UserType, environment: Environment): FeatureConfig {
  return configs[environment][userType];
}

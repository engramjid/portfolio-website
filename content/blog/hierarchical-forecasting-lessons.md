---
title: "Lessons from Building Hierarchical Forecasting Models"
excerpt: "What I learned reconciling forecasts across 300+ retail locations — and why bottom-up isn't always the answer."
date: "2026-05-12"
tags: ["Forecasting", "Time Series", "Machine Learning"]
coverImage: "/images/blog/forecasting.svg"
---

## The problem with flat forecasting

When you forecast demand for hundreds of SKUs across hundreds of locations, a flat, independent model per series sounds appealing — it's simple, it's parallelizable, and it's easy to reason about. It's also usually wrong in a way that compounds.

Individual store-SKU series are noisy. A single location might sell a handful of units of a slow-moving SKU per week, and that noise makes bottom-up forecasts unstable exactly where the business needs the most confidence: replenishment decisions.

## Reconciliation changed the outcome

Rather than trusting each series independently, we forecasted at multiple levels of the hierarchy — national, region, store, SKU — and reconciled them so that the sums were coherent. The trick isn't the reconciliation math itself (that part is well-trodden); it's deciding _which_ level should be trusted most for a given category.

For high-velocity SKUs, bottom-up worked fine. For long-tail SKUs, top-down allocation driven by the regional trend consistently beat naive bottom-up, because the aggregate signal was simply less noisy than any individual store-SKU series.

## What actually moved the needle

1. **Feature engineering beat model choice.** Swapping Prophet for LightGBM mattered less than adding promo calendars, weather, and local event flags.
2. **Reconciliation was worth more than any single model tweak.** MinT reconciliation alone closed a meaningful chunk of the error gap.
3. **Forecast intervals mattered as much as point forecasts.** Planners needed a defensible range, not just a number, to make confident ordering decisions.

We took MAPE from 34% down to 12% over two quarters — but the bigger win was planner trust. Once the intervals were reliable, planners stopped overriding the model by default, which was the real blocker to adoption.

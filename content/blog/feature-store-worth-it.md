---
title: "Do You Actually Need a Feature Store?"
excerpt: "Feature stores solve a real problem — but for a lot of teams, a well-modeled dbt layer gets you 80% of the value for 20% of the operational overhead."
date: "2026-03-02"
tags: ["MLOps", "Data Engineering", "dbt"]
coverImage: "/images/blog/feature-store.svg"
---

## The pitch is compelling

Feature stores promise consistent features between training and serving, point-in-time correctness, and reusability across teams. All real problems. All worth solving.

But "worth solving" isn't the same as "worth a dedicated system." Before reaching for Feast, Tecton, or a cloud-vendor feature store, it's worth asking what's actually breaking today.

## What we tried first

We started with the failure mode most teams hit: training-serving skew from features computed two different ways in two different codebases. Instead of introducing a new system, we:

- Centralized feature logic in dbt models, versioned and tested like any other transformation.
- Used the same dbt-produced tables for both offline training and batch scoring, eliminating the two-codebases problem entirely.
- Added point-in-time joins as explicit dbt macros for anything with temporal leakage risk.

## Where this approach breaks down

This isn't a universal answer. It falls apart once you need low-latency online serving (sub-100ms feature lookups for a real-time model), because a batch warehouse table isn't built for that access pattern. That's the point where a real online feature store earns its keep.

## The actual decision rule

If every model you ship is batch-scored on a schedule, a disciplined dbt layer with strong testing will get you most of a feature store's benefits without the extra infrastructure. Reach for a dedicated feature store only when you have a concrete online-serving latency requirement — not because the term shows up in a vendor's marketing deck.

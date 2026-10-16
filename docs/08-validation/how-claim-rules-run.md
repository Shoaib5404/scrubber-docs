---
id: how-claim-rules-run
title: How Claim Rules Run
sidebar_label: How Rules Run
---

# How Claim Rules Run

**Status:** Implemented (`claim-validation`)

After a file passes [structural validation](../edi-837p/structural-validation), Scrubber saves the claims and then checks whether each claim is billable. That second pass is the business rules. The full list of codes is the [business rule catalog](./business-rule-catalog).

A business rule looks at the meaning of the claim: missing names, impossible dates, member ID shapes, procedure codes, diagnosis codes, modifiers, and payer-specific billing policy.

## What you see

Each finding has four parts a reviewer can use without reading the code:

| Part | Meaning |
|---|---|
| Rule code | A stable ID such as `DOS-FUT-001`. The same situation always uses the same code. |
| Field | The claim item to correct, such as the billing NPI or a service line. |
| Message | A sentence that says what is wrong. |
| Severity | **Error** blocks a clean claim. **Warning** should be reviewed. **Info** is a note and does not by itself fail the claim. |

When the run finishes, the claim status is:

- **error** if any error was recorded
- **warning** if there are warnings and no errors
- **valid** if neither was recorded

Each service line receives the same kind of status from the findings that point at that line.

## The order of the run

`validateClaim` always walks the same path. Later steps are skipped when an earlier gate says the rest of the claim cannot be judged yet.

1. **Claim basics.** Required fields, filing indicator, and Blue Cross Blue Shield routing.
2. **Payer and EDI edits.** Member IDs, addresses, ZIP codes, dates, frequency codes, labs, and the other claim-level catalog rules.
3. **Future date of service.** If `DOS-FUT-001` fires, the run stops. Scrubber does not score procedure codes on a claim whose service date has not happened yet.
4. **Provider NPI**, then **CPT core**. A line that fails the core procedure check is left out of the clinical rules.
5. **Clinical rules**, only for lines that passed CPT core: diagnosis, NDC, age and gender, add-on codes, place of service, modifiers, anesthesia, evaluation and management, NCCI, and units (MUE).
6. **Status write.** The claim and its lines are saved as error, warning, or valid.

Some clinical rules also wait for a matching payer or filing indicator. A UnitedHealthcare place-of-service rule does not run on a Medicare claim. A code in the catalog is the rule Scrubber *can* report. It is reported only when that claim matches the rule’s conditions.

## Two switches

| Setting | Default | Effect |
|---|---|---|
| `SCRUBBER_RULE_SWITCH_ENM_ONE_DAY_EARLIER` | on | Evaluation-and-management date comparisons may treat the prior day as related. |
| `SCRUBBER_RULE_SWITCH_EM_BUNDLING` | on | Same-day E/M bundling rules run, including a check against other claims for the same member. |

## Where this runs

Validation runs inside the batch worker after parse. Staff and portal users then read the saved findings on the claim. They do not re-run the rules in the browser.

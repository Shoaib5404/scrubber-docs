---
id: structural-validation
title: Structural Validation
sidebar_label: Structural Validation
---

# Structural Validation

**Status:** Implemented (`edi-structural-validation`)

Structural validation asks one question: **is this file a well-formed professional claim (837P)?** It runs when a file is uploaded, before Scrubber saves a batch or looks at medical coding.

If the file fails, Scrubber does not create a claim to review. The upload is rejected, the stored file is removed, and the upload log records a short message: “EDI file is not in a correct format.” The detailed findings stay on the upload response so the sender can fix the file.

Business rules (diagnosis codes, NCCI, payer member IDs, and the rest) run only after a file has passed this step. See [How claim rules run](../validation/how-claim-rules-run).

## How to read a finding

Each finding has a rule ID such as `G001`. The ID is stable. The message next to it says what is wrong in that file. Most structural findings are errors. `ENV-ISA` can also warn when the sender ID and receiver ID are identical.

Scrubber runs **39 structural rules**, in the order below. They are registered in `createStructuralRules()`.

## 1. The file envelope (8 rules)

An 837 file is wrapped in three nested envelopes: the interchange (ISA/IEA), the functional group (GS/GE), and the transaction (ST/SE). These rules check that the wrappers open, close, and agree with each other.

| Rule | What a reader should understand |
|---|---|
| `ENV-ISA` | The file must start with an ISA header. The control number must be numeric, the interchange date cannot be in the future, and the sender ID should differ from the receiver ID. |
| `ENV-ELEMENTS` | Every envelope field (ISA, IEA, GS, GE, ST, SE, and BHT) must match the expected length, type, and required/optional setting. |
| `G001` | The control number that opens the interchange (ISA) must be the same number that closes it (IEA). |
| `G006` | The closing interchange must declare the same number of functional groups that are actually in the file. |
| `G002` | The control number that opens a functional group (GS) must match the number that closes it (GE). |
| `G005` | The closing group must declare the same number of transactions that are actually inside that group. |
| `G003` | The control number that opens a transaction (ST) must match the number that closes it (SE). |
| `G004` | The closing transaction must declare the same number of segments that sit between ST and SE. |

## 2. The claim header (2 rules)

The header names who is sending the file and who should receive it, and it carries the batch date.

| Rule | What a reader should understand |
|---|---|
| `HDR-1000-ELEMENTS` | The submitter (loop 1000A) and receiver (loop 1000B) name segments, including the contact (PER) when it is required, must follow the field specification. |
| `HDR-STRUCT` | The header must be structurally complete. The batch reference on BHT03 is required. |

## 3. The claim hierarchy (4 rules)

837P organizes people in a tree: billing provider, then subscriber, then patient when the patient is not the subscriber.

| Rule | What a reader should understand |
|---|---|
| `HL-HIER` | Parent and child levels must connect in a valid tree. A subscriber cannot appear without a billing provider, and a patient level cannot float free of its subscriber. |
| `HL-2000A-ELEMENTS` | Fields on the billing-provider level (loop 2000A) must match the specification. |
| `HL-2000B-ELEMENTS` | Fields on the subscriber level (loop 2000B) must match the specification. |
| `HL-2000C-ELEMENTS` | Fields on the patient level (loop 2000C), when that level is used, must match the specification. |

## 4. Providers (7 rules)

These rules look at who billed the claim, where payment should go, and the specialty (taxonomy) reported for the provider.

| Rule | What a reader should understand |
|---|---|
| `PROV-2010AA-ELEMENTS` | The billing provider’s name, ID, and address fields (loop 2010AA) must match the specification. |
| `PROV-2010AB-ELEMENTS` | The pay-to provider (loop 2010AB), when present, must match the specification. |
| `PROV-2010AC-ELEMENTS` | The pay-to plan (loop 2010AC), when present, must match the specification. |
| `PROV-BILL` | The billing provider block must be structurally valid, not only field-by-field. |
| `PROV-CLM` | Claim-level provider information must be structurally valid. |
| `PROV-2310-ELEMENTS` | Providers named on the claim itself (loop 2310), such as rendering or referring, must match the specification. |
| `TAX-STRUCT` | The provider specialty (taxonomy) segment must be structurally valid. |

## 5. Subscriber, payer, and patient (6 rules)

| Rule | What a reader should understand |
|---|---|
| `SUB-2010BA-ELEMENTS` | The subscriber’s name and ID fields (loop 2010BA) must match the specification. |
| `SUB-STRUCT` | The subscriber block must be structurally valid. |
| `PYR-2010BB-ELEMENTS` | The payer’s name and ID fields (loop 2010BB) must match the specification. |
| `PYR-STRUCT` | The payer block must be structurally valid. |
| `PAT-2010CA-ELEMENTS` | The patient’s name fields (loop 2010CA), when the patient is different from the subscriber, must match the specification. |
| `PAT-STRUCT` | The patient block must be structurally valid. |

## 6. The claim, references, and notes (4 rules)

| Rule | What a reader should understand |
|---|---|
| `CLM-2300-ELEMENTS` | Fields on the claim loop (2300) must match the specification. |
| `CLM-STRUCT` | The CLM segment, which carries the claim charge and place of service, must be structurally valid. |
| `REF-STRUCT` | Reference numbers on the claim (prior authorization, referral, CLIA, and similar REF segments) must be structurally valid. |
| `NTE-STRUCT` | Claim notes (NTE) must be structurally valid. |

## 7. Other insurance (2 rules)

Coordination of benefits is the part of the file that describes another payer that already processed the claim.

| Rule | What a reader should understand |
|---|---|
| `COB-2320-ELEMENTS` | When another payer is reported (loop 2320), its fields must match the specification, including required companion segments. |
| `COB-STRUCT` | The other-payer block must be structurally valid. |

## 8. Service lines, amounts, diagnoses, and dates (6 rules)

A service line is one procedure on the claim. These rules check the shape of those lines. They do not decide whether the procedure code is medically correct. That happens in [business rules](../validation/business-rule-catalog).

| Rule | What a reader should understand |
|---|---|
| `SVC-2400-ELEMENTS` | Each service line (loop 2400) must contain the required procedure segment and any required companion segments, such as a drug segment when a drug line is used. |
| `SVC-STRUCT` | The service line must be structurally valid: procedure, pointers, and related segments fit together. |
| `DRUG-STRUCT` | Drug information on a line (NDC and related segments) must be structurally valid. |
| `AMT-STRUCT` | Amount segments must be structurally valid. |
| `DX-STRUCT` | Diagnosis segments must be structurally valid. |
| `DATE-STRUCT` | Dates must be real calendar dates in the expected format (eight digits, year-month-day). A range must be two valid dates. |

## What this step does not do

Structural validation does not check whether a CPT code is payable, whether a diagnosis matches the patient’s age, or whether a member ID belongs to a particular payer. Those are business rules, and they run only after the file has been accepted.

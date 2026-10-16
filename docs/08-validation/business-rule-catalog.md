---
id: business-rule-catalog
title: Business Rule Catalog
sidebar_label: Business Rule Catalog
---

# Business Rule Catalog

**Status:** Implemented (`claim-validation`)

These are the rules Scrubber runs **after** a file has passed structural validation. Read [How claim rules run](./how-claim-rules-run) for the order and the gates that skip later rules.

There are **298 rule codes**. A code appears on a claim only when that claim matches the rule. Source files live under `scrubber-backend/src/modules/claim-validation`.

## Required claim fields

These run on every claim, before payer-specific edits.

| Code | What it means |
|---|---|
| `REQ-001` | The billing provider’s NPI is missing. |
| `REQ-002` | The subscriber’s member ID is missing. |
| `REQ-003` | The payer is missing. |
| `REQ-004` | The claim has no diagnosis code. |
| `REQ-005` | The total charge must be greater than zero. |
| `FMT-001` | The billing NPI must be exactly 10 digits. |
| `FMT-002` | The billing NPI fails the standard check-digit test, so it is not a real NPI. |

## Who the claim is filed to

| Code | What it means |
|---|---|
| `SBR-001` | The filing indicator (Medicare, Medicaid, commercial, and so on) is missing or not usable. |
| `SBR-002` | The subscriber’s responsibility (primary, secondary, tertiary) does not fit the filing indicator. |
| `SBR-003` | The subscriber or patient date of birth is missing when this filing type requires it. |
| `BCBS-001` | The member ID belongs to a different Blue Cross Blue Shield plan than the payer on the claim. Send it to the plan that owns that prefix. |

## Dates

`DOS-FUT-001` is special: if the date of service is in the future, Scrubber stops and does not run the clinical rules.

| Code | What it means |
|---|---|
| `DOS-FUT-001` | A claim or line date of service is in the future. |
| `DTP-DOS-BHT-001` | The date of service is later than the date the claim file was created. |
| `DOB-SUB-001` | The subscriber’s date of birth is after the date of service. |
| `DOB-PAT-001` | The patient’s date of birth is after the date of service. |
| `ADM-POS-001` | A hospital place of service (21, 51, or 61) needs an admission date. |
| `DTP-ADM-POS-001` | This place of service usually does not need an admission date. |
| `DTP-ACC-REQ-001` | An accident date is required for workers’ compensation, auto, or an accident-related claim. |
| `DTP-LMP-001` | The last menstrual period cannot be the same day as the onset of illness. |
| `DTP-LMP-002` | A last menstrual period may be sent only for a female patient. |
| `DTP-ITD-REQ-001` | Medicare claims for certain specialties need an initial treatment date. |
| `DTP-LSD-REQ-001` | Certain specialties need a last-seen date. |
| `DTP-CLAIM-001` | A claim-level date is outside the allowed range. |
| `DTP-431-001` | Onset of current illness, when sent, must be a valid date. |
| `DTP-484-001` | Last menstrual period, when sent, must be a valid date. |
| `DTP-454-001` | Initial treatment date, when sent, must be a valid date. |
| `DTP-304-001` | Last seen date, when sent, must be a valid date. |
| `DTP-439-001` | Accident date, when sent, must be a valid date. |
| `DTP-455-001` | Last X-ray date, when sent, must be a valid date. |
| `DTP-435-001` | Admission date, when sent, must be a valid date. |
| `DTP-096-001` | Discharge date, when sent, must be a valid date. |
| `DTP-471-001` | Hearing or vision prescription date, when sent, must be a valid date. |
| `DTP-360-001` | Disability start date, when sent, must be a valid date. |
| `DTP-361-001` | Disability end date, when sent, must be a valid date. |
| `DTP-297-001` | Last worked date, when sent, must be a valid date. |
| `DTP-296-001` | Authorized return-to-work date, when sent, must be a valid date. |
| `DTP-090-001` | Assumed-care date, when sent, must be a valid date. |
| `DTP-091-001` | Relinquished-care date, when sent, must be a valid date. |

## Names, address, tax ID, and SSN

| Code | What it means |
|---|---|
| `BP-NAME-001` | The billing provider name is missing or not in an acceptable form. |
| `SUB-NAME-001` | When the subscriber is the patient, the name cannot be a test or placeholder name. |
| `SUB-NAME-002` | The subscriber name is blocked or the last name is not in an acceptable form. |
| `PAT-NAME-001` | The patient name cannot be a test or placeholder name. |
| `PAT-LNAME-001` | The patient last name is not in an acceptable form. |
| `PAT-FNAME-001` | The patient first name is not in an acceptable form. |
| `LOC-NAME-001` | The service location name cannot start with a number. |
| `LOC-NAME-002` | The service location name is not in an acceptable form. |
| `ADDR-001` | The billing provider address must be a street address. A PO Box is not allowed. |
| `TIN-BILL-001` | The billing tax ID is missing or the wrong length. |
| `TIN-BILL-002` | The billing tax ID is a placeholder, not a real tax ID. |
| `SSN-001` | A Social Security number on the claim is not in a valid form. |
| `CS-SSN-001` | This payer does not accept a Social Security number as the member ID. |

## ZIP code and city

For each person on the claim, Scrubber checks three things: the ZIP is a real USPS ZIP, the state matches that ZIP, and the city matches the USPS city for that ZIP. An acceptable alternate city is a warning, not an error. `ZIP-CITY-001` is the fallback city code when a more specific code is not set.

| Person | ZIP | State vs ZIP | City vs ZIP |
|---|---|---|---|
| Billing provider | `ZIP-BILL-001` | `ZIP-STATE-BILL-001` | `ZIP-CITY-BILL-001` |
| Patient | `ZIP-PAT-001` | `ZIP-STATE-PAT-001` | `ZIP-CITY-PAT-001` |
| Service facility | `ZIP-FAC-001` | `ZIP-STATE-FAC-001` | `ZIP-CITY-FAC-001` |
| Subscriber | `ZIP-SUB-001` | `ZIP-STATE-SUB-001` | `ZIP-CITY-SUB-001` |
| Other subscriber | `ZIP-OSUB-001` | `ZIP-STATE-OSUB-001` | `ZIP-CITY-OSUB-001` |
| Other patient | `ZIP-OPAT-001` | `ZIP-STATE-OPAT-001` | `ZIP-CITY-OPAT-001` |

`CITY-BILL-001`, `CITY-SUB-001`, and `CITY-FAC-001` check the city name itself (billing, subscriber, and facility) when that separate city edit applies.

## Provider identifiers

| Code | What it means |
|---|---|
| `NPI-001` | The rendering provider NPI is missing or not a known ordering/referring NPI for this filing type. |
| `NPI-002` | The rendering provider’s last name does not match the NPI on file. |
| `NPI-003` | The referring provider’s name does not match the NPI on file. |
| `NPI-FAC-001` | The billing NPI and the service facility NPI cannot be the same. |
| `NPI-REN-001` | A rendering provider should be sent only when that provider is different from the billing provider. |
| `NPI-REN-LOC-001` | The rendering NPI and the service location NPI cannot be the same. |
| `REF-REQ-001` | A referral or prior authorization was sent, but no referring provider was named. |
| `REF-NPI-001` | For certain commercial payers, the referring provider is missing or invalid. |
| `REF-NPI-002` | The referring provider NPI failed the provider-file check. |
| `REF-CMS-001` | The referring provider does not satisfy the Medicare referring-provider check. |
| `REF-MB-001` | Medicare Part B does not accept a UPIN or state license in place of an NPI. |
| `TAX-BP-001` | The billing provider taxonomy is missing. |
| `TAX-BP-002` | The billing provider taxonomy is not an active taxonomy code. |

## Member ID shape for a specific payer

Each code below runs only when the claim’s payer ID matches the number in the code. The member ID must fit that payer’s pattern. If it does not, the finding says the member ID is missing or invalid.

| Code | The member ID must look like |
|---|---|
| `MID-05047` | Exactly 9 digits. |
| `MID-06105` | 9 to 11 digits. |
| `MID-06111` | 8 to 10 digits. |
| `MID-07205` | 9 or 10 digits. |
| `MID-13334` | 9 to 11 digits. |
| `MID-13337` | Starts with N or H, then 7 to 9 digits. |
| `MID-21313` | 7 to 9 digits. |
| `MID-22099` | 11 to 15 letters or digits. |
| `MID-23045` | 12 to 15 letters or digits. |
| `MID-23281` | 9 to 11 digits. |
| `MID-25133` | 9 to 11 letters or digits. |
| `MID-25175` | 9 or 10 digits. |
| `MID-29076` | 7 to 12 letters or digits. |
| `MID-31053` | Starts with H or C, then one letter or digit, then 10 digits. |
| `MID-31114` | 9 to 12 digits. |
| `MID-31625` | Exactly 11 digits. |
| `MID-38309` | 9 to 12 letters or digits. |
| `MID-38333` | 7 to 14 letters or digits. |
| `MID-38336` | 9 to 12 digits. |
| `MID-39026` | 8 to 12 digits. |
| `MID-44054` | 8 or 9 digits. |
| `MID-52095` | 8 to 10 letters or digits. |
| `MID-52189` | Exactly 11 digits. |
| `MID-55247` | 8 to 11 letters or digits. |
| `MID-56162` | 9 to 11 letters or digits. |
| `MID-59274` | The letter A followed by 10 digits. |
| `MID-61101` | The letter H followed by 8 to 10 digits. |
| `MID-61124` | 8 to 14 letters or digits. |
| `MID-62308` | 8 to 12 letters or digits. |
| `MID-72467` | Exactly 9 letters or digits. |
| `MID-73143` | Starts with C or N, then 8 to 10 digits. |
| `MID-80141` | 8 to 15 letters or digits. |
| `MID-80142` | Exactly 9 digits. |
| `MID-80314` | 9 to 12 letters or digits. |
| `MID-81400` | The letter C followed by 8 to 10 digits. |
| `MID-84146` | 9 or 10 digits. |
| `MID-86033` | 9 to 11 letters or digits. |
| `MID-87815` | Exactly 10 digits. |
| `MID-93029` | Exactly 9 digits. |
| `MID-94134` | 8 to 12 digits. |
| `MID-94135` | 8 to 12 digits. |
| `MID-94316` | 9 to 12 letters or digits. |
| `MID-95378` | Exactly 9 digits. |
| `MID-95567` | 9 to 14 letters or digits. |
| `MID-SB690` | 9 to 14 letters or digits. |
| `MID-SX009` | Exactly 8 digits. |
| `MID-SX065` | 9 to 11 letters or digits. |

## Member ID meaning and routing

These codes do more than check length. They say the ID is the wrong kind of number, or that the claim was sent to the wrong payer.

| Code | What it means |
|---|---|
| `MID-MC018` | Alabama Medicaid member IDs must be at least 10 digits. |
| `MID-12115` | VA Fee Basis claims must use the patient’s Social Security number as the member ID. |
| `MID-12116` | Same VA Fee Basis requirement for the paired payer ID. |
| `MID-ASH-001` | American Specialty Health IDs must look like three letters, then H, then eight digits. |
| `MID-VNS-001` | VNS Choice IDs must start with V and then eight digits. |
| `MID-AETNA-001` | Aetna IDs must follow the indemnity/PPO or HMO pattern Aetna publishes. |
| `MID-AL-001` | Alabama Medicaid IDs must be 12 or 13 digits. |
| `MID-GRP-001` | The member ID and the group number cannot be the same value. |
| `MID-SUB-001` | The subscriber or other-subscriber member ID is missing. |
| `MID-SUB-002` | The subscriber or other-subscriber member ID is a blocked or invalid value. |
| `MID-AFF-001` | This Affinity ID shape belongs on payer 23334. |
| `MID-AFF-002` | This Affinity ID shape belongs on payer 13334. |
| `MID-AFF-003` | This Affinity ID shape belongs on payer 13333. |
| `MID-AFF-ROUTING` | The Affinity member ID was sent to the wrong Affinity payer. |
| `VAL-OPT-001` | The member ID belongs to Value Options and must be sent to payer SX173NOCD. |
| `MID-SRI-001` | The member ID belongs to Student Resources and must be sent to payer 74227. |
| `MID-HOSP-001` | A hospital-benefits member ID cannot be billed with a Blue Cross filing indicator. |
| `MID-NHP-001` | Neighborhood IDs that start with 13 belong on payer 96240. |
| `MID-NHP-002` | Neighborhood IDs that do not start with 13 belong on payer 05047. |
| `MID-REG-001` | This Blue Cross prefix belongs to Regence (payer 00611). |
| `MID-BCI-001` | This Blue Cross prefix belongs to Blue Cross of Idaho. |
| `MID-BCMI-001` | This prefix belongs to Blue Cross Blue Shield of Michigan, and it is not a Medicare member ID. |
| `MID-WNY-001` | This prefix is Amerigroup and does not belong on the Blue Cross of Western New York payer. |
| `MID-MA-001` | This Medicare Advantage prefix belongs on a different payer than the one billed. |
| `MID-MBI-001` | The Medicare Beneficiary Identifier is missing or does not match the MBI pattern. |

## Subscriber relationship and insurance type

| Code | What it means |
|---|---|
| `SBR-MC-001` | Medicaid subscribers must be reported as “self.” |
| `SBR-MCD-001` | For the listed Medicaid payers, the patient must be the subscriber, and a separate patient is not allowed. |
| `SBR-GRP-MCD-001` | Medicare and Medicaid claims cannot carry a subscriber group number, except the one excluded payer. |
| `ITC-SBR-001` | An insurance type code is only used when the secondary payer is Medicare. |
| `ITC-SBR-MCR-001` | When Medicare is secondary or tertiary, the insurance type code is required. |
| `AARP-PRI-001` | AARP (payer 36273) cannot be the primary payer. |

## Claim frequency and delay

| Code | What it means |
|---|---|
| `CLM-FREQ-001` | A replacement or void needs the original claim reference number. |
| `CLM-FREQ-MCR-001` | Medicare original claims must use the original frequency code. |
| `CLM-FREQ-MCR-002` | Medicare does not accept corrected or void claims electronically. |
| `CLM-FREQ-CORR-001` | The listed payers accept corrected or void claims on paper only. |
| `CLM-DELAY-001` | An old Medicaid claim needs a delay reason unless it is a paper submission. |

## Coordination of benefits

| Code | What it means |
|---|---|
| `COB-BCBS-001` | Blue Cross as secondary will not take the claim until 30 days after the Medicare payment date. |
| `COB-MCR-F8-001` | When Blue Cross is secondary to Medicare, the other payer’s claim control number is required. |
| `COB-AMT-001` | Amounts paid by the other payer cannot be negative. |

## Place of service

| Code | What it means |
|---|---|
| `POS-001` | The place of service is blank or not a recognized place-of-service code. This code is also used when a procedure is not allowed in the place of service on the line. |
| `POS-002` | The procedure is not valid for the place of service on that line. |
| `UHC-POS-001` | This CPT is not allowed in the UnitedHealthcare place of service on the line. |
| `UHC-POS-002` | UnitedHealthcare payer 87726 does not allow place of service 02 (telehealth). |

## Procedure codes

| Code | What it means |
|---|---|
| `REQ-007` | The service line has no procedure code. |
| `CPT-001` | The procedure code is not in the CPT/HCPCS reference file, or it is not billable. |
| `AOC-001` | An add-on procedure was billed without its required primary procedure. |
| `HCPCS-S-001` | S-codes are not valid for Medicare. |
| `HCPCS-I-001` | This I-code is not payable for the claim’s filing indicator. |
| `CPT-MC-001` | Medicare does not cover this consultation code for the matched member and payer. |
| `CPT-BCBSNE-001` | Blue Cross Blue Shield of Nebraska does not cover this consultation code. |
| `CPT-AETNA-MEB-001` | Aetna does not cover this consultation code for member IDs with the matched prefix. |
| `CPT-ADM-SUB-001` | An admission visit and a subsequent hospital visit cannot share the same date of service. |
| `CPT-HOSP-UNIT-001` | A hospital admission visit must be billed as one unit, and it cannot be repeated on the same day. |
| `CPT-DC-001` | A hospital discharge visit needs a discharge date. |
| `CPT-DC-002` | A hospital discharge visit must be billed as one unit. |
| `CPT-DC-003` | A hospital discharge visit cannot be on the same day as another discharge visit. |
| `CPT-MCD-HH-001` | Medicaid does not cover this home-health certification code. |
| `CPT-CER-001` | Cerumen removal needs a supporting diagnosis from the allowed list. |
| `CPT-EMB-001` | For Emblem/Fidelis, this screening procedure needs the matching screening diagnosis on the line. |
| `CPT-EMB-002` | For Emblem/Fidelis, this screening procedure is only allowed inside the published age range. |
| `UHC-PA-001` | This UnitedHealthcare procedure needs a prior authorization, or the diagnosis does not satisfy the authorization rule. |

## Service line amounts, units, and drugs

| Code | What it means |
|---|---|
| `REQ-006` | The line charge is missing. |
| `REQ-008` | The line is missing a required unit count, date, or diagnosis pointer. |
| `FMT-004` | A line date or unit value is not in a usable format. |
| `BUS-005` | A business limit on the line was exceeded, such as a pointer that does not match a diagnosis. |
| `AMT-ZERO-001` | The line charge is zero, and this procedure is not on the zero-charge exception list. |
| `UNIT-DAY-001` | The units do not match the number of days between the from and to dates. |
| `NDC-0` | A drug procedure is missing its NDC. |
| `NDC-1` | The NDC is not valid for the procedure. |
| `NDC-2` | The NDC quantity is missing or not valid. |
| `NDC-3` | The NDC unit of measure is missing or not valid. |

## Diagnosis codes

| Code | What it means |
|---|---|
| `ICD-VAL-001` | The diagnosis code is not in the ICD reference file. |
| `ICD-EX1-001` | The diagnosis is an Excludes1 conflict with another diagnosis on the claim. |
| `ICD-EX2-001` | The diagnosis is an Excludes2 conflict and should be reviewed. |
| `ICD-CF-001` | A code-first instruction says another diagnosis should be listed first. |
| `ICD-CF-002` | A use-additional-code instruction is not satisfied. |
| `ICD-ADD-001` | An additional diagnosis required by the tabular notes is missing. |
| `ICD-UPD-001` | The diagnosis code has been replaced and should be updated. |
| `ICD-TC-001` | The diagnosis type does not match the claim version (professional versus institutional coding). |
| `ICD-GEN-001` | The diagnosis is limited to one sex, and the patient’s sex was not sent. |
| `ICD-GEN-002` | The diagnosis does not match the patient’s sex. |
| `ICD-AGE-001` | The patient’s age is below the minimum for this diagnosis. |
| `ICD-AGE-002` | The patient’s age is above the maximum for this diagnosis. |
| `ICD-AGE-003` | The age rule could not be applied because the date of birth is missing. |
| `ICD-AGE-004` | The patient’s age is outside the allowed range for this diagnosis. |
| `ICD-BS-001` | A laterality diagnosis (left, right, or bilateral) does not match the modifier on the line. |
| `ICD-Z01-001` | For Blue Cross of Florida, this Z01 screening code must be the principal diagnosis. |
| `ICD-SEQ-001` | A sequela (late-effect) diagnosis cannot be the principal diagnosis for this payer. |
| `ICD-V49-001` | This auto/PIP diagnosis must be sent to the paper payer, not the electronic payer. |
| `ICD-EMB-001` | For Emblem/Fidelis, this screening diagnosis needs the matching screening procedure. |
| `ICD-BMI-001` | A BMI diagnosis cannot be the principal diagnosis when the procedure is a routine HCPCS code. |
| `ICD-BCBSFL-001` | For Blue Cross of Florida, this diagnosis is allowed only in the primary position. |
| `ICD-BCBSFL-002` | For Blue Cross of Florida, more than one of these primary-only diagnoses was sent. |
| `NCD-ICD-001` | Medicare’s national coverage list says this procedure is not covered with the linked diagnosis. |
| `AETNA-FETAL-001` | Aetna does not cover this fetal-procedure code with the linked diagnosis. |
| `AETNA-B12-001` | Aetna’s B12 local coverage rule does not allow this procedure with the linked diagnosis. |
| `CIGNA-ICD-001` | Cigna payer 62308 does not allow this procedure with the linked diagnosis for the patient’s age. |

## Age, gender, and anesthesia on the procedure

| Code | What it means |
|---|---|
| `AGE-001` | The procedure is not allowed below this age. |
| `AGE-002` | The procedure is not allowed above this age. |
| `AGE-003` | The procedure’s age rule needs a date of birth, and none was sent. |
| `AGE-004` | The patient’s age is outside the range published for this procedure. |
| `GEN-001` | The procedure is limited to one sex, and sex was not sent. |
| `GEN-002` | The procedure does not match the patient’s sex. |
| `ANE-001` | An anesthesia procedure is missing the required anesthesia modifier. |
| `ANE-002` | The anesthesia modifier is not valid for this procedure. |
| `ANE-003` | Anesthesia time or units are missing or not valid. |
| `ANE-004` | The anesthesia units do not match the reported time. |

## Modifiers

| Code | What it means |
|---|---|
| `MOD-001` | A required modifier is missing, or a modifier on the line is not allowed for this procedure. |
| `MOD-SEQ-001` | For this filing indicator, modifiers must be reported in the published sequence. |
| `MOD-50-001` | For Blue Cross, modifier 50 (bilateral) cannot be billed with units greater than one. |
| `MOD-59-XEPSU-001` | Modifier 59 and an XE/XP/XS/XU modifier should not both be on the same line. |
| `MOD-EP-001` | Modifier EP (EPSDT) is a warning unless the claim is Medicaid. |
| `MOD-EP-002` | Modifier EP on these procedures is a warning when the patient is older than the EPSDT age limit. |
| `MOD-GVGW-001` | Hospice modifiers GV and GW are only for Medicare. |
| `MOD-GVGW-002` | These hospice procedures need modifier GV or GW. |
| `SURG-MOD-001` | A major surgery needs the global-period modifier the rule expects. |
| `SURG-MOD-002` | An evaluation-and-management visit in a surgery’s global period needs the correct modifier. |
| `SURG-MOD-003` | A procedure inside another procedure’s global days needs the correct modifier. |
| `RAD-TC-001` | This radiology procedure needs the technical-component modifier for the place of service. |

## Evaluation and management, well visits, and vaccines

| Code | What it means |
|---|---|
| `EM-001` | Two evaluation-and-management visits conflict on this claim. |
| `EM-DOS-001` | An E/M visit and a related procedure fall on dates that the rule treats as the same encounter. |
| `EM-DOS-002` | A second E/M on the same day needs a modifier that explains why it is separate. |
| `EM-DOS-003` | The E/M date does not line up with the related surgery date. |
| `EM-UNIT-001` | An E/M visit must be billed as one unit. |
| `EM-MENTAL-001` | A mental-health add-on was billed without the required E/M visit. |
| `EM-WELL-001` | An office E/M cannot be billed with a preventive (well-visit) diagnosis. |
| `EM-BDL-001` through `EM-BDL-014` | Same-day E/M bundling. Each code is one pairing, such as a new-patient visit with a procedure, a preventive visit with a problem visit, or brief check-in 98016 with a related visit on this claim or another claim for the same member. |
| `WELL-VISIT-001` | A preventive visit needs a principal diagnosis in the Z00–Z13 range. |
| `WELL-VISIT-002` | A Medicare annual wellness visit needs a principal diagnosis in the Z00–Z13 range. |
| `WELL-VISIT-003` | Medicare Part B does not allow these preventive CPT codes. |
| `WELL-VISIT-004` | A vaccine given with a well visit needs principal diagnosis Z23. |
| `WELL-VISIT-005` | A well-visit diagnosis should not be used with an office problem-oriented E/M for this filing type. |
| `MCR-VAC-001` | A Medicare vaccine needs the matching administration code and diagnosis Z23. |
| `VAC-ADM-001` | A vaccine needs administration code 90471, and extra components need 90472. |
| `VAC-ADM-002` | For younger patients, a vaccine needs 90460, and extra components need 90461. |
| `VAC-ADM-003` | The 90471/90472 pair and the 90460/90461 pair cannot be used on the same day. |

## NCCI and units

NCCI stops two procedures that Medicare says should not be paid together unless a modifier correctly separates them. MUE stops a unit count above the published maximum. See [NCCI and MUE](./ncci-and-mue).

| Code | What it means |
|---|---|
| `NCCI-001` | Two procedures on the claim are a column-1 / column-2 pair and cannot both be paid. |
| `NCCI-002` | The pair can be separated only with an allowed modifier, and that modifier is missing. |
| `NCCI-003` | The modifier used does not bypass this NCCI pair. |
| `NCCI-004` | The pair is allowed only in one direction, and the claim has them reversed. |
| `MUE-001` | Units are above the practitioner MUE for this code on this date. |
| `MUE-002` | Units are above the MUE even after the modifier split is considered. |
| `MUE-003` | The same code’s units, added across lines, are above the MUE. |
| `MUE-UHC-001` | For UnitedHealthcare Oxford, units are above that plan’s MUE. Other payers use `MUE-001` through `MUE-003` instead. |

## Consults and mammography

| Code | What it means |
|---|---|
| `CONSULT-REF-001` | A consultation procedure needs a referring provider. |
| `CONSULT-REF-002` | The referring provider does not match the consultation reference list. |
| `MAMMO-EW-001` | A mammography procedure needs the mammography certification number, unless the excluded modifier is present. |

## Lab CLIA

| Code | What it means |
|---|---|
| `LAB-CLIA-001` | Lab procedures for this filing type need a CLIA number. |
| `LAB-CLIA-002` | Informational note: specimen-collection code 36415 does not by itself require CLIA. |
| `LAB-CLIA-003` | The CLIA number is missing. |
| `LAB-CLIA-004` | The CLIA number is present but not in the required format. |
| `LAB-QW-001` | Modifier QW is only valid on procedures that are waived-test codes. |

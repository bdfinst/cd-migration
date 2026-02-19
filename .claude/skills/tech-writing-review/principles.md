# Technical Writing Principles

Reference for the tech-writing-review skill. Each principle includes what to look for, why it matters, and what good looks like.

## 1. Front-load the point

**What to look for:**
- Paragraphs where the main point appears in the third sentence or later
- Sections that start with context or history before stating what the section is about
- Introductory clauses that delay the subject ("With the advent of...", "In order to...", "Given that...")

**Why it matters:** Readers who are scanning will read the first sentence of each paragraph and the first paragraph of each section. If the point is buried, they miss it or give up.

**What good looks like:**
- The first sentence of each section states the key takeaway
- Context and justification follow the point, not precede it
- "X does Y because Z" not "Because Z, and given W, X does Y"

## 2. One idea per paragraph

**What to look for:**
- Paragraphs that cover two or more distinct ideas
- Paragraphs longer than 5 sentences
- Paragraphs where the last sentence is not about the same thing as the first sentence

**Why it matters:** Long paragraphs are walls of text. Readers skip them. Splitting into focused paragraphs with white space makes each idea findable.

**What good looks like:**
- Each paragraph makes one point
- 2-4 sentences per paragraph is typical
- A new idea starts a new paragraph

## 3. Use headings as answers

**What to look for:**
- Generic headings: "Overview", "Background", "Details", "Notes"
- Headings that describe the topic but not the point: "Testing" vs. "Tests must be written before implementation"
- Missing headings where a long section covers multiple topics

**Why it matters:** Readers use headings to navigate. A heading that answers the reader's question ("How do I get started?") is more useful than one that labels a topic ("Getting Started"). Headings should work as a standalone outline.

**What good looks like:**
- Someone reading only the headings understands the page's argument
- Headings use active language: "Define test specifications before generating code" not "Test specification definition"
- No section longer than ~300 words without a sub-heading

## 4. Prefer lists and tables over prose for structured information

**What to look for:**
- Prose paragraphs that describe a sequence of steps
- Sentences that list three or more items inline ("You need X, Y, Z, and W")
- Comparisons described in running text rather than in a table
- Repeated parallel structures in consecutive paragraphs (each starting "For X...", "For Y...")

**Why it matters:** Structured information is faster to scan in structured formats. Prose is for explanation and argument. Lists are for enumeration. Tables are for comparison.

**What good looks like:**
- Steps are numbered lists
- Parallel items are bullet lists
- Multi-attribute comparisons are tables
- Prose explains why, lists and tables show what

## 5. Cut filler and throat-clearing

**What to look for:**
- Opening phrases that add no information: "It is important to note that", "It should be mentioned that", "As we discussed earlier"
- Redundant qualifiers: "completely unique", "absolutely essential", "very critical"
- "This means that" or "What this means is" before restating what was just said
- Sentences that announce what the next section will cover instead of just covering it

**Why it matters:** Every unnecessary word competes for the reader's attention with the words that matter. Filler dilutes the signal.

**What good looks like:**
- Delete the filler and check if the meaning changes. If not, it was filler.
- "It is important to note that tests must be written first" becomes "Tests must be written first"
- "What this means is that the pipeline will fail" becomes "The pipeline will fail"

## 6. Make examples concrete and minimal

**What to look for:**
- Explanations with no examples
- Examples that are longer than they need to be (boilerplate obscures the point)
- Examples that are too abstract to apply ("consider a typical service")
- Code examples without context about what they demonstrate

**Why it matters:** Concrete examples anchor abstract concepts. But examples that are too long or too vague fail to anchor anything.

**What good looks like:**
- Each major concept has at least one concrete example
- Examples show the minimum needed to illustrate the point
- Code examples have a one-line comment or preceding sentence explaining what to look at
- Examples use realistic but simple scenarios (not "foo/bar" but not a 50-line class either)

## 7. Signal structure early

**What to look for:**
- Long pages with no indication of what sections follow
- Sections where the reader cannot tell how much is left
- Missing "overview" or "what you will learn" framing on section landing pages

**Why it matters:** Readers decide whether to keep reading based on whether they expect the content to answer their question. Telling them the page's structure up front helps them decide quickly.

**What good looks like:**
- Long pages open with a brief roadmap: "This page covers X, Y, and Z"
- Section landing pages list their sub-pages with one-sentence descriptions
- The reader can estimate the page's scope from the first screen

## 8. Write for the scanner, then the reader

**What to look for:**
- Important terms buried mid-paragraph with no visual emphasis
- Key takeaways that only appear in running prose, not called out
- Long unbroken text without visual anchors (bold, lists, tables, code blocks)
- Sections where every paragraph looks the same (uniform density, no variation)

**Why it matters:** Most readers scan first, then read the parts that look relevant. If every paragraph looks the same, there is nothing to grab the scanner's eye.

**What good looks like:**
- Key terms and takeaways are **bold** on first use
- Important warnings or prerequisites use alert/callout boxes
- Visual variety: a mix of prose, lists, tables, code blocks, and callouts
- The page "breathes" with white space between sections

## 9. Avoid abstraction stacking

**What to look for:**
- Sentences where every noun is abstract: "The enforcement of consistency between artifacts preserves the reliability of the reference frame"
- Definitions that use more abstract terms than the term being defined
- Chains of nominalization: "the implementation of the validation of the specification" instead of "validating that the implementation matches the spec"

**Why it matters:** Each layer of abstraction requires the reader to hold more in working memory. Two abstract nouns in a sentence is fine. Four or five makes the sentence opaque.

**What good looks like:**
- At least one concrete noun or verb per sentence
- "The pipeline checks that tests pass" not "Pipeline enforcement of test validation occurs"
- When abstract terms are necessary, follow immediately with a concrete example

## 10. Match depth to audience need

**What to look for:**
- Sections that go deep on a topic the reader will not act on from this page
- Missing depth on topics where the reader needs to make a decision
- Uniform depth across all sections (some topics need a paragraph, others need a page)
- Reference material mixed into tutorial/guide material or vice versa

**Why it matters:** Not every section needs the same level of detail. Giving equal depth to everything means the important parts do not stand out.

**What good looks like:**
- Decision points get more depth (options, trade-offs, criteria)
- Background and context get less depth (just enough to understand the decision)
- Reference material (lists of values, API details) is separated from explanation
- Links to deeper content replace in-page deep dives when the detail serves only some readers

## 11. Page length and decomposition

**What to look for:**
- Pages over 2,000 words where sections serve different reader moments (learning vs. reference vs. checklist)
- Pages where a reader must scroll past content they do not need to find content they do
- Sections that are self-contained and could be bookmarked independently
- Pages that mix "what is this" with "how do I do it" with "what goes wrong"

**Why it matters:** A page that answers five different questions forces readers with one question to wade through four irrelevant sections. Shorter, focused pages are easier to find, easier to link to, and easier to maintain.

**What good looks like:**
- Each page answers one primary question or serves one reader moment
- If a page naturally splits into "overview" and "detailed reference," those are two pages
- Section landing pages route to sub-pages; they do not try to contain all the content themselves
- Pages are under 2,000 words; pages over that threshold have a clear reason to stay together

## 12. Consistent voice and register

**What to look for:**
- Shifts between formal and informal register within a page
- Switching between "you/your" and "the team/teams" without consistency
- Passive voice in sections that should be direct instructions
- Mixing imperative ("Do X") with descriptive ("X should be done") in the same list

**Why it matters:** Inconsistent voice is distracting. It makes the reader wonder if different sections were written by different people (they probably were) and whether the advice is equally authoritative throughout.

**What good looks like:**
- Pick a register and hold it. This site uses direct, second-person ("you", "your team")
- Instructions use imperative voice: "Define test scenarios before implementation" not "Test scenarios should be defined"
- Descriptive sections use active voice: "The pipeline validates" not "Validation is performed by the pipeline"

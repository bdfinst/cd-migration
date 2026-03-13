---
title: "Team Chatbot"
linkTitle: "Team Chatbot"
description: >
  A ready-to-use facilitator chatbot that helps your team diagnose delivery problems
  and navigate the CD migration journey - works with any LLM.
weight: 17
icon: "fas fa-robot"
---

This is a pre-built facilitator chatbot for teams starting or stuck in their CD migration. Paste the system prompt into any LLM (Claude, ChatGPT, Gemini, or similar) and it becomes a conversation partner that asks your team the right questions, identifies what is holding you back, and points you to the right resources on this site.

## Download the chatbot setup

<a href="/cd-facilitator-chatbot.md" download="cd-facilitator-chatbot.md" class="btn btn-primary">Download chatbot setup</a>

The file is a plain text Markdown file. It contains three things: setup instructions, the system prompt to paste, and a suggested opening message.

## How to apply it

### Claude (claude.ai)

1. Open a new conversation. If you use **Claude Projects**, paste the system prompt into the **Project Instructions** field - this keeps it active across the whole project.
2. Otherwise, paste the system prompt as your first message, prefixed with: `Please follow these instructions for our entire conversation:`
3. Send the suggested opening message to begin.

### ChatGPT (chat.openai.com)

1. If you have access to **Custom GPTs**, create one and paste the system prompt into the **Instructions** field.
2. For a quick session without a custom GPT: paste the system prompt as your first message, prefixed with `Act as the following for this entire conversation:`, then send the suggested opening message next.

### Gemini (gemini.google.com)

1. Paste the system prompt as your first message, prefixed with `Follow these instructions for our entire conversation:`
2. Send the suggested opening message next.

## Tips for a useful session

- **Run it as a group.** Two or three people from the team together gives much better results than one person answering solo. Share your screen or use a shared workspace.
- **Be specific.** "Releases are painful" is less useful than "we have four people running scripts for two days every six weeks." The more concrete the description, the more relevant the guidance.
- **Let it ask first.** The chatbot is designed to diagnose before it advises. Answer its questions before asking your own.
- **End with one action.** At the close of the session, ask: "What is the single most important next step for us?" Take that one thing and act on it.

## What the chatbot knows

The system prompt embeds the full structure of this site, including all symptom pages, anti-pattern categories, migration phases, and improvement plays. When it points you to a resource, it gives you a direct link to the relevant page.

It is not a general-purpose assistant. It stays focused on continuous delivery and delivery improvement. If the conversation drifts, it redirects.

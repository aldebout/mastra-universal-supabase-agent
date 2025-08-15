# Universal Supabase Database Chat - AI Database Assistant with Mastra

An intelligent AI assistant that helps you explore, analyze, and interact with your Supabase database through natural language conversation. Built on Mastra's agent architecture, this system provides seamless database exploration capabilities without requiring SQL expertise.

Talk to your database like you'd talk to a data analyst - ask questions, get insights, and perform operations using plain English. The assistant understands your database schema, can execute complex queries, and provides clear explanations of your data.

## Features

### Intelligent Database Agent
- **Supabase Explorer Agent**: Natural language database interface that transforms user questions into precise database operations
- **Universal Schema Understanding**: Automatically discovers and understands your database structure, tables, and relationships. The repo provides an example todo app but this can be plugged to any Supabase instance.
- **Query Intelligence**: Converts natural language requests into optimized PostgREST API calls or SQL queries

### Database Integration
- **PostgREST API Integration**: Direct interaction with Supabase's auto-generated REST API
- **Multi-Tenant**: The agent uses the logged user token so all operations are compliant with RLS
- **SQL to REST Conversion**: Advanced query transformation using Supabase's sql-to-rest capabilities
- **OpenAPI Schema Discovery**: Automatic database schema exploration and endpoint discovery
- **Real-time Operations**: Support for SELECT, INSERT, UPDATE, DELETE operations with safety checks

### Developer Experience
- **Authentication Integration**: Seamless Supabase Auth integration with RLS support
- **Modern Stack**: Built with React, Vite, and TanStack Query for optimal performance

## How to Use

### Quick Start

```bash


# Install dependencies for the example app
cd ../todo-app-example
npm install

# Start Supabase locally (optional)
npx supabase start

# Set up your environment
cp .env.example .env
# Fill in your Supabase credentials

# Run the example app
npm run dev
```

In another terminal:

```bash
# Install dependencies for the Mastra agent
cd mastra
npm install

# Set up your environment
cp .env.example .env
# Fill in your Supabase & OpenAI credentials

# Run the mastra dev server
npm run dev
```

### Interaction Examples

**Schema Exploration**: "What tables do I have in my database?" - Get a complete overview of your database structure with relationships and column details.

**Data Analysis**: "Show me all users who signed up last week" - Natural language queries automatically converted to optimized database operations.

**Complex Queries**: "Find the average order value by customer segment" - Advanced aggregations and joins handled through intelligent query planning.

**Data Operations**: "Add a new todo item with title 'Review Q4 reports'" - Safe data modifications with confirmation prompts.

## Dependencies

### Core Framework
- **@mastra/core**: Latest Mastra framework with agent capabilities

### Database Integration
- **@supabase/supabase-js**: Official Supabase JavaScript client
- **@supabase/sql-to-rest**: Advanced SQL to PostgREST query conversion

## Project Structure

The repository contains two main components:

### `/mastra` - The Core AI Agent System
```
mastra/src/mastra/
├── agents/
│   └── supabase-explorer-agent.ts    # Main database interaction agent
├── tools/
│   ├── postgrest-request.ts          # Direct PostgREST API operations
│   ├── sql-to-rest.ts                # SQL query conversion
│   ├── postgrest-openapi.ts          # Schema discovery
│   └── supabase-postgrest.ts         # Tool orchestration
├── middleware/
│   ├── auth.ts                       # Authentication middleware
│   └── index.ts                      # Middleware composition
└── index.ts                          # Mastra configuration
```

### `/todo-app-example` - React Application Example
```
todo-app-example/src/
├── components/
│   ├── AuthProvider.tsx              # Supabase authentication
│   ├── ChatBot.tsx                   # AI chat interface
│   ├── TodoApp.tsx                   # Example application
│   └── TodoForm.tsx                  # Database interaction demo
├── api/
│   └── todos.ts                      # API layer
├── lib/
│   ├── supabase.ts                   # Supabase client setup
│   └── queryClient.ts                # TanStack Query configuration
└── types/
    ├── database.ts                   # Generated database types
    └── todo.ts                       # Application types
```

## Getting Started with Your Own Database

1. **Set up your Supabase project** with your existing database or create new tables
2. **Configure environment variables** with your Supabase credentials

And that's it!

## Architecture

This system demonstrates a universal, secure, multi-tenant database agent.

### Authentication Middleware Flow

The core architecture centers around **authentication middleware** that intercepts and validates user sessions before passing them to database tools:

1. **User Authentication**: Client applications authenticate with Supabase Auth
2. **Token Validation**: Middleware validates JWT tokens and extracts user context
3. **Authenticated Tool Execution**: Database tools receive authenticated user context
4. **RLS Enforcement**: All database operations automatically respect Row Level Security policies

### Multi-Tenant Security with RLS

Every database operation is executed with the **authenticated user's context**, ensuring:

- **Row Level Security**: Database policies automatically filter data based on user permissions, no bypass
- **Data Isolation**: Users can only access data they're authorized to see
- **Audit Trail**: All operations are logged with user attribution

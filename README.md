
# InvisiBox - Anonymous Workplace Communication Platform

InvisiBox is a privacy-first anonymous communication platform that bridges the gap between employees and management. It enables secure, two-way communication without requiring employees to create accounts or reveal their identities.

## 🌟 Key Features

- **Account-Free Employee Access**: Employees can participate without creating accounts or passwords
- **Anonymous Identity Protection**: Employees receive unique proxy email addresses that completely mask their real identity
- **Two-Way Communication**: Management can send messages and polls; employees can reply and participate anonymously
- **Real-Time Messaging**: Instant communication through email integration
- **Poll & Survey System**: Create polls and share results with employees
- **Subscriber Management**: Warn or ban problematic users while maintaining anonymity
- **Search Functionality**: Search messages and polls by title
- **Responsive Design**: Works seamlessly across all devices

## 🔧 How It Works

### For Management:
1. **Account Creation**: Management creates an account and receives a company InvisiBox email (e.g., `company123@invisibox.email`)
2. **Employee Onboarding**: Share the company InvisiBox email with employees
3. **Dashboard Access**: Use the management dashboard to send messages, create polls, and manage subscribers
4. **Communication**: Send messages and polls to all subscribers, view responses anonymously

### For Employees:
1. **Subscription**: Subscribe using personal email + company InvisiBox email
2. **Anonymous Email**: Receive a unique proxy email (e.g., `emp9x83xxx@invisibox.email`)
3. **Communication**: Send messages and respond to polls using the proxy email
4. **Privacy**: Real identity remains completely hidden from management

## 📧 Email Communication Flow

InvisiBox leverages **Postmark's Inbound Email** feature as the backbone of its communication system:

### Inbound Email Processing:
1. **Employee Sends Message**: Employee sends email from their proxy address to the company address
2. **Postmark Reception**: Postmark receives the email and forwards it to our webhook endpoint
3. **Backend Processing**: Our system processes the inbound email, extracts content, and stores the message
4. **Management Notification**: Message appears in the management dashboard instantly

### Outbound Email Delivery:
1. **Management Sends Message**: Management creates a message/poll through the dashboard
2. **Backend Processing**: System processes the message and prepares it for delivery
3. **Postmark Delivery**: Messages are sent to all subscriber proxy emails via Postmark
4. **Employee Reception**: Employees receive messages in their regular email inbox

### Email Proxy System:
- **Anonymous Routing**: All emails are routed through InvisiBox proxy addresses
- **Identity Protection**: Real employee emails are never exposed to management
- **Bidirectional Flow**: Messages flow seamlessly in both directions while maintaining anonymity

## 🏗️ Architecture Overview

### Frontend (React + TypeScript):
- **Management Portal**: Dashboard for sending messages, creating polls, managing subscribers
- **Employee Interface**: Simple subscription and messaging interface
- **Responsive Design**: Tailwind CSS with shadcn/ui components

### Backend Integration:
- **Email Service**: Postmark for reliable email delivery and inbound processing
- **Database**: Stores messages, polls, subscribers, and company information
- **API Layer**: RESTful API for all frontend interactions
- **Authentication**: JWT-based authentication for management accounts

### Key Technologies:
- **Frontend**: React 18, TypeScript, Tailwind CSS, shadcn/ui
- **State Management**: Zustand, TanStack Query
- **Routing**: React Router DOM
- **Build Tool**: Vite
- **Email Service**: Postmark (inbound webhooks + outbound delivery)

## 🔒 Privacy & Security

### Employee Privacy:
- **No Account Required**: Employees never create passwords or profiles
- **Anonymous Proxy Emails**: Unique addresses that can't be traced back to real identity
- **Zero Data Linking**: Real employee emails are never stored with their proxy addresses
- **Secure Communication**: All communication flows through encrypted email channels

### Management Security:
- **Authenticated Access**: Secure login system for management accounts
- **Data Isolation**: Each company's data is completely isolated
- **Audit Trail**: Track all messages and actions for compliance
- **Subscriber Management**: Tools to manage problematic users while maintaining anonymity

## 🚀 Getting Started

### For Management:
1. Visit the application and click "For Management"
2. Sign up with your company details
3. Receive your company InvisiBox email
4. Share this email with employees
5. Start communicating through the dashboard

### For Employees:
1. Visit the application and click "For Employees"
2. Subscribe using your email + company InvisiBox email
3. Check your email for your unique proxy address
4. Start sending anonymous messages using your proxy email

## 🛠️ Development

### Prerequisites:
- Node.js & npm
- Postmark account for email services
- Backend API server

### Installation:
```bash
# Clone the repository
git clone <repository-url>

# Navigate to project directory
cd invisibox

# Install dependencies
npm install

# Start development server
npm run dev
```

### Environment Setup:
The application requires backend services for:
- User authentication
- Message storage and retrieval
- Email proxy management
- Postmark webhook handling

## 📝 API Integration

The frontend integrates with backend APIs for:
- **Authentication**: `/auth/login`, `/auth/signup`
- **Employee Operations**: `/employees/subscribe`, `/employees/send-message`
- **Management Operations**: `/messages`, `/polls`, `/subscribers`
- **Email Processing**: Postmark webhook endpoints for inbound email

## 🤝 Contributing

This application is production-ready and designed for secure, anonymous workplace communication. The email integration with Postmark ensures reliable message delivery while maintaining complete anonymity for employees.

## 📄 License

This project is proprietary software designed for workplace communication solutions.

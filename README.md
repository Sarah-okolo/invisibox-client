
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

## Getting started 🚀

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


## 📄 License

This project is proprietary software designed for workplace communication solutions.


# InvisiBox - Anonymous Workplace Communication Platform

InvisiBox is a privacy-first anonymous communication platform that bridges the gap between employees and management. It enables secure, two-way communication without requiring employees to create accounts or reveal their identities.

![Invisibox hero section](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/u99vwk3wf04s3s45x4or.png)

## 🌟 Key Features

- **Account-Free Employee Access**: Employees can participate without creating accounts or passwords; they are only required to subscribe to their company's Invisibox channel.

  ![Employee subscription page](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/9n8kzy2r9uh526dxjxk2.png)

- **Anonymous Identity Protection**: Employees receive unique proxy email addresses that completely mask their real identity
  ![Employee subscription page](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/9n8kzy2r9uh526dxjxk2.png)
- **Two-Way Anonymous Communication and Real-time Messaging**: Management can create and send messages to all employees; employees can reply and participate anonymously. Employees can also send anonymous messages to their management and receive replies. Instant communication through email integration and identity masking through Invisibox's proxy emails
  ![Employee send message page](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/laor7p3ap0sn53s6o2s1.png)
  ![2 way email communication](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/kb0ngxu9ofg617e09cuc.png)
 
- **Poll & Survey System**: Create polls, employees can vote anonymously, and poll results can be shared to all subscribed employees
   ![Create poll page](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/v4b2fs1lsmtb54amz1v2.png)
  ![Poll email](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/9jz9drt2dsw889klo6xp.png)
  ![Poll page](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/1tfg125hjo2d2iu04qqi.png)
- **Subscriber Management**: Warn or ban problematic users while maintaining anonymity
  ![Manage subscribers page](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/0bz6iigfusxskez502jd.png)
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

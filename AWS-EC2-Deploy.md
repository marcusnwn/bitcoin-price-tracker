# To run on AWS EC2

Create an AWS EC2 instance

SSH to the EC2 instance

Install Nodejs and git on the instance
Reference: https://github.com/nodesource/distributions/blob/master/README.md#rpminstall

```
curl -fsSL https://rpm.nodesource.com/setup_16.x | sudo bash -
sudo yum install -y nodejs
sudo yum install -y git
```

Clone app on server
```
git clone https://github.com/marcusnwn/bitcoin-price.git
```

Install the dependencies
```
cd bitcoin-price
npm install
```

Start the app and keep the app running even closing the terminal or server restarts using PM2
```
sudo npm install pm2 -g
sudo pm2 start app.js
sudo pm2 startup
sudo pm2 save
```

# An architecture that is scalable and highly available

Create an AMI from the EC2 instance

Create an Auto Scaling Group in multi AZs using the AMI as launch template

Create an Application Load Balancer for the Auto Scaling Group

Specify the scaling policy and health check

Create an Route53 alias record to point to the Application Load Balancer, update the nameservers on the 3rd party domain registrar.

Add a SSL in ACM for your domain, update ALB HTTPS listener using the SSL.

Final Outcome:

[https://bitcointracker.cloudee.org/](https://bitcointracker.cloudee.org/)
![BitcoinTrackerApp](https://user-images.githubusercontent.com/9261163/142562484-809b54d8-5910-4a1c-bfab-4c248894642b.png)

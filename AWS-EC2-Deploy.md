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

Install the dependencies and start the server
```
cd bitcoin-price
npm install
node app.js
```
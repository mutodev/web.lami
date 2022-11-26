deploy:
    ssh -i "ssh/Ubuntu-LAMI3.pem" ubuntu@52.3.32.125 -y "cd /opt/web.lami ; sudo git pull ; sudo yarn build";

ssh -i "ssh/Ubuntu-LAMI3.pem" ubuntu@52.3.32.125 -y "cd /opt/api.lami ; sudo pkill node ; sudo git pull ; sudo sh -x /etc/init.d/lamiService start ; tail -f /var/log/lamiservice.log"
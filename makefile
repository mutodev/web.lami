nggc:
 v ${N}  --skip-import

gm:
  ng generate module ${N}


deploy:
  ssh -i "ssh/Ubuntu-LAMI3.pem" ubuntu@52.3.32.125


  # regionfolder.wrapWithRegion (Ctrl+M Ctrl+R)
ssh -i "ssh/Ubuntu-LAMI3.pem" ubuntu@52.3.32.125 -y "cd /opt/web.lami ; sudo git pull ; sudo yarn build"
const n=`port 1194
proto udp
dev tun

ca ca.crt
cert server.crt
key server.key  # This file should be kept secret
dh dh.pem

server 10.8.0.0 255.255.255.0
ifconfig-pool-persist ipp.txt

push "redirect-gateway def1 bypass-dhcp"
push "dhcp-option DNS 208.67.222.222"
push "dhcp-option DNS 208.67.220.220"

keepalive 10 120

cipher AES-256-CBC
auth SHA256

comp-lzo

user nobody
group nogroup

persist-key
persist-tun

status openvpn-status.log
verb 3
explicit-exit-notify 1
`;export{n as default};

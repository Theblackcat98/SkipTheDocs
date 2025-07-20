const t=`# This is a configuration file for etcd.
#
# This is the default node name for this member.
name: 'default'
# This is the directory to store the data.
data-dir: '/var/lib/etcd/default.etcd'
# This is the list of comma separated URLs to listen on for client traffic.
listen-client-urls: 'http://localhost:2379'
# This is the list of comma separated URLs to advertise to the rest of the cluster for client traffic.
advertise-client-urls: 'http://localhost:2379'
# This is the list of comma separated URLs to listen on for peer traffic.
listen-peer-urls: 'http://localhost:2380'
# This is the list of comma separated URLs to advertise to the rest of the cluster for peer traffic.
initial-advertise-peer-urls: 'http://localhost:2380'
# This is the list of comma separated URLs of the other members in the cluster.
initial-cluster: 'default=http://localhost:2380'
# This is the token for the initial cluster.
initial-cluster-token: 'etcd-cluster'
# This is the state of the initial cluster.
initial-cluster-state: 'new'
`;export{t as default};

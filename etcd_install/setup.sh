#!/bin/bash

cin_dir=$1
if [ -z ${cin_dir} ];then
    echo "请指定安装路径！"
    exit 1
fi
ip=`ip a|grep inet|grep -v inet6|grep -v 127.0.0.1|awk '{print $2}'|awk -F/ '{print $1}'`
tar xf ./etcd*.tar.gz -C ${cin_dir}
mkdir -p /etc/etcd
mkdir -p /var/log/etcd
cp -rf ./conf.yml /etc/etcd/
sed -i "s#cin_dir#${cin_dir}#g" /etc/etcd/conf.yml
sed -i "s#ip#${ip}#g" /etc/etcd/conf.yml
#echo "export ETCDCTL_API=3" >> /etc/profile
#source /etc/profile

ln -s ${cin_dir}/etcd-v3.3.8-linux-amd64/etcd /usr/bin
ln -s ${cin_dir}/etcd-v3.3.8-linux-amd64/etcdctl /usr/bin
cp -rf ./etcd /etc/init.d/
sed -i "s#cin_dir#${cin_dir}#g" /etc/init.d/etcd
chmod +x /etc/init.d/etcd
etcd -version
if [ $? -eq 0 ];then
    echo "etcd安装成功"
else
    echo "etcd安装失败"
fi

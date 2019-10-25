#!/bin/bash
#LANMP

src_home=`pwd`
python = '/home/zabbix/software/python27/bin/python'


###安装ansible
#setuptools


tar zxf ${src_home}/software/ansible/package/setuptools-7.0.tar.gz  -C ${src_home}/software/ansible/package/
cd ${src_home}/software/ansible/package/setuptools-7.0 && ${python} setup.py install > /dev/null 2>&1

#pycrypto
tar zxf ${src_home}/software/ansible/package/pycrypto-2.6.1.tar.gz  -C ${src_home}/software/ansible/package/ 
cd ${src_home}/software/ansible/package/pycrypto-2.6.1 && ${python} setup.py install > /dev/null 2>&1

#PyYAML
tar zxf ${src_home}/software/ansible/package/yaml-0.1.5.tar.gz  -C ${src_home}/software/ansible/package/ 
cd ${src_home}/software/ansible/package/yaml-0.1.5 && ./configure --prefix=/home/cin-soss/local > /dev/null 2>&1
cd ${src_home}/software/ansible/package/yaml-0.1.5 && make --jobs=`grep processor /proc/cpuinfo |wc -l` > /dev/null 2>&1 && make install > /dev/null 2>&1

tar zxf ${src_home}/software/ansible/package/PyYAML-3.11.tar.gz  -C ${src_home}/software/ansible/package/ 
cd ${src_home}/software/ansible/package/PyYAML-3.11 && ${python} setup.py install > /dev/null 2>&1

#Jinja2
tar zxf ${src_home}/software/ansible/package/MarkupSafe-0.9.3.tar.gz  -C ${src_home}/software/ansible/package/ 
cd ${src_home}/software/ansible/package/MarkupSafe-0.9.3 && ${python} setup.py install > /dev/null 2>&1

tar zxf ${src_home}/software/ansible/package/Jinja2-2.7.3.tar.gz  -C ${src_home}/software/ansible/package/ 
cd ${src_home}/software/ansible/package/Jinja2-2.7.3 && ${python} setup.py install > /dev/null 2>&1

#paramiko
tar zxf ${src_home}/software/ansible/package/ecdsa-0.11.tar.gz  -C ${src_home}/software/ansible/package/ 
cd ${src_home}/software/ansible/package/ecdsa-0.11 && ${python} setup.py install > /dev/null 2>&1

tar zxf ${src_home}/software/ansible/package/paramiko-1.15.1.tar.gz  -C ${src_home}/software/ansible/package/ 
cd ${src_home}/software/ansible/package/paramiko-1.15.1 && ${python} setup.py install > /dev/null 2>&1

#ansible 2.3.2
tar zxf ${src_home}/software/ansible/package/ansible-2.3.2.0.tar.gz  -C ${src_home}/software/ansible/package/ 
cd ${src_home}/software/ansible/package/ansible-2.3.2.0 && ${python} setup.py install > /dev/null 2>&1
if  [ $? -eq 0 ];then
        echo -n "ansible安装成功!------"
elif [ $? -ne 0 ];then
        echo -n "ansible安装失败!"
                exit 1
fi

mkdir /etc/ansible
cp -rf ${src_home}/software/ansible/etc/ansible/* /etc/ansible/


##安装pyzabbix
tar zxf ${src_home}/software/ansible/package/certifi-2018.10.15.tar.gz  -C ${src_home}/software/ansible/package/
cd ${src_home}/software/ansible/package/certifi-2018.10.15 && ${python} setup.py install > /dev/null 2>&1

tar zxf ${src_home}/software/ansible/package/urllib3-1.24.1.tar.gz  -C ${src_home}/software/ansible/package/
cd ${src_home}/software/ansible/package/urllib3-1.24.1 && ${python} setup.py install > /dev/null 2>&1

tar zxf ${src_home}/software/ansible/package/idna-2.7.tar.gz  -C ${src_home}/software/ansible/package/
cd ${src_home}/software/ansible/package/idna-2.7 && ${python} setup.py install > /dev/null 2>&1

tar zxf ${src_home}/software/ansible/package/chardet-3.0.4.tar.gz -C ${src_home}/software/ansible/package/
cd ${src_home}/software/ansible/package/chardet-3.0.4 && ${python} setup.py install > /dev/null 2>&1

tar zxf ${src_home}/software/ansible/package/requests-2.20.0.tar.gz -C ${src_home}/software/ansible/package/
cd ${src_home}/software/ansible/package/requests-2.20.0 && ${python} setup.py install > /dev/null 2>&1

tar zxf ${src_home}/software/ansible/package/pyzabbix-0.7.4.tar.gz -C ${src_home}/software/ansible/package/
cd ${src_home}/software/ansible/package/pyzabbix-0.7.4 && ${python} setup.py install > /dev/null 2>&1
if  [ $? -eq 0 ];then
        echo -n "pyzabbix安装成功!------"
elif [ $? -ne 0 ];then
        echo -n "pyzabbix安装失败!"
                exit 1
fi

tar zxf ${src_home}/software/ansible/package/zabbix-api-0.5.3.tar.gz -C ${src_home}/software/ansible/package/
cd ${src_home}/software/ansible/package/zabbix-api-0.5.3 && ${python} setup.py install > /dev/null 2>&1
if  [ $? -eq 0 ];then
        echo -n "zabbix-api安装成功!------"
elif [ $? -ne 0 ];then
        echo -n "zabbix-api安装失败!"
                exit 1
fi
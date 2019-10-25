#!/bin/bash

python="/home/cin-soss/local/python27/bin/python2"
pwd=`pwd`
unzip ${pwd}/setuptools-40.6.2.zip -d ${pwd}
cd ${pwd}/setuptools-40.6.2 && ${python} setup.py install > /dev/null 2>&1
if  [ $? -eq 0 ];then
        echo -n "安装成功!------"
elif [ $? -ne 0 ];then
        echo -n "安装失败!"
                exit 1
fi

tar xf  ${pwd}/pip-18.1.tar.gz -C ${pwd}
cd ${pwd}/pip-18.1 && ${python} setup.py install > /dev/null 2>&1
if  [ $? -eq 0 ];then
        echo -n "安装成功!------"
elif [ $? -ne 0 ];then
        echo -n "安装失败!"
                exit 1
fi

tar xf  ${pwd}/pyasn1-0.4.4.tar.gz -C ${pwd}
cd ${pwd}/pyasn1-0.4.4 && ${python} setup.py install > /dev/null 2>&1
if  [ $? -eq 0 ];then
        echo -n "安装成功!------"
elif [ $? -ne 0 ];then
        echo -n "安装失败!"
                exit 1
fi

tar xf  ${pwd}/pycparser-2.19.tar.gz -C ${pwd}
cd ${pwd}/pycparser-2.19 && ${python} setup.py install > /dev/null 2>&1
if  [ $? -eq 0 ];then
        echo -n "安装成功!------"
elif [ $? -ne 0 ];then
        echo -n "安装失败!"
                exit 1
fi
tar xf  ${pwd}/cffi-1.11.5.tar.gz -C ${pwd}
cd ${pwd}/cffi-1.11.5 && ${python} setup.py install > /dev/null 2>&1
if  [ $? -eq 0 ];then
        echo -n "安装成功!------"
elif [ $? -ne 0 ];then
        echo -n "安装失败!"
                exit 1
fi

tar xf  ${pwd}/six-1.11.0.tar.gz -C ${pwd}
cd ${pwd}/six-1.11.0 && ${python} setup.py install > /dev/null 2>&1
if  [ $? -eq 0 ];then
        echo -n "安装成功!------"
elif [ $? -ne 0 ];then
        echo -n "安装失败!"
                exit 1
fi

tar xf  ${pwd}/PyNaCl-1.3.0.tar.gz -C ${pwd}
cd ${pwd}/PyNaCl-1.3.0 && ${python} setup.py install > /dev/null 2>&1
if  [ $? -eq 0 ];then
        echo -n "安装成功!------"
elif [ $? -ne 0 ];then
        echo -n "安装失败!"
                exit 1
fi

tar xf  ${pwd}/ipaddress-1.0.22.tar.gz -C  ${pwd}
cd ${pwd}/ipaddress-1.0.22 && ${python} setup.py install > /dev/null 2>&1
if  [ $? -eq 0 ];then
        echo -n "安装成功!------"
elif [ $? -ne 0 ];then
        echo -n "安装失败!"
                exit 1
fi

tar xf  ${pwd}/enum34-1.1.6.tar.gz -C ${pwd}
cd ${pwd}/enum34-1.1.6 && ${python} setup.py install > /dev/null 2>&1
if  [ $? -eq 0 ];then
        echo -n "安装成功!------"
elif [ $? -ne 0 ];then
        echo -n "安装失败!"
                exit 1
fi

tar xf  ${pwd}/asn1crypto-0.24.0.tar.gz -C ${pwd}
cd ${pwd}/asn1crypto-0.24.0 && ${python} setup.py install > /dev/null 2>&1
if  [ $? -eq 0 ];then
        echo -n "安装成功!------"
elif [ $? -ne 0 ];then
        echo -n "安装失败!"
                exit 1
fi

tar xf  ${pwd}/idna-2.7.tar.gz -C ${pwd}
cd ${pwd}/idna-2.7 && ${python} setup.py install > /dev/null 2>&1
if  [ $? -eq 0 ];then
        echo -n "安装成功!------"
elif [ $? -ne 0 ];then
        echo -n "安装失败!"
                exit 1
fi

tar xf  ${pwd}/cryptography-2.4.2.tar.gz -C ${pwd}
cd ${pwd}/cryptography-2.4.2 && ${python} setup.py install > /dev/null 2>&1
if  [ $? -eq 0 ];then
        echo -n "安装成功!------"
elif [ $? -ne 0 ];then
        echo -n "安装失败!"
                exit 1
fi

tar xf  ${pwd}/bcrypt-3.1.4.tar.gz -C ${pwd}
cd ${pwd}/bcrypt-3.1.4 && ${python} setup.py install > /dev/null 2>&1
if  [ $? -eq 0 ];then
        echo -n "安装成功!------"
elif [ $? -ne 0 ];then
        echo -n "安装失败!"
                exit 1
fi



tar xf  ${pwd}/paramiko-2.4.2.tar.gz -C ${pwd}
cd ${pwd}/paramiko-2.4.2 && ${python} setup.py install > /dev/null 2>&1
if  [ $? -eq 0 ];then
        echo -n "安装成功!------"
elif [ $? -ne 0 ];then
        echo -n "安装失败!"
                exit 1
fi

tar xf  ${pwd}/backports_abc-0.5.tar.gz -C ${pwd}
cd ${pwd}/backports_abc-0.5 && ${python} setup.py install > /dev/null 2>&1
if  [ $? -eq 0 ];then
        echo -n "安装成功!------"
elif [ $? -ne 0 ];then
        echo -n "安装失败!"
                exit 1
fi

tar xf  ${pwd}/singledispatch-3.4.0.3.tar.gz -C ${pwd}
cd ${pwd}/singledispatch-3.4.0.3 && ${python} setup.py install > /dev/null 2>&1
if  [ $? -eq 0 ];then
        echo -n "安装成功!------"
elif [ $? -ne 0 ];then
        echo -n "安装失败!"
                exit 1
fi

tar xf  ${pwd}/futures-3.2.0.tar.gz -C ${pwd}
cd ${pwd}/futures-3.2.0 && ${python} setup.py install > /dev/null 2>&1
if  [ $? -eq 0 ];then
        echo -n "安装成功!------"
elif [ $? -ne 0 ];then
        echo -n "安装失败!"
                exit 1
fi

tar xf  ${pwd}/certifi-2018.11.29.tar.gz -C ${pwd}
cd ${pwd}/certifi-2018.11.29 && ${python} setup.py install > /dev/null 2>&1
if  [ $? -eq 0 ];then
        echo -n "安装成功!------"
elif [ $? -ne 0 ];then
        echo -n "安装失败!"
                exit 1
fi

tar xf  ${pwd}/tornado-4.5.2.tar.gz -C ${pwd}
cd ${pwd}/tornado-4.5.2 && ${python} setup.py install > /dev/null 2>&1
if  [ $? -eq 0 ];then
        echo -n "安装成功!------"
elif [ $? -ne 0 ];then
        echo -n "安装失败!"
                exit 1
fi


tar xf  ${pwd}/urllib3-1.24.1.tar.gz -C ${pwd}
cd ${pwd}/urllib3-1.24.1 && ${python} setup.py install > /dev/null 2>&1
if  [ $? -eq 0 ];then
        echo -n "安装成功!------"
elif [ $? -ne 0 ];then
        echo -n "安装失败!"
                exit 1
fi

tar xf  ${pwd}/chardet-3.0.4.tar.gz -C ${pwd}
cd ${pwd}/chardet-3.0.4 && ${python} setup.py install > /dev/null 2>&1
if  [ $? -eq 0 ];then
        echo -n "安装成功!------"
elif [ $? -ne 0 ];then
        echo -n "安装失败!"
                exit 1
fi

tar xf  ${pwd}/requests-2.20.1.tar.gz -C ${pwd}
cd ${pwd}/requests-2.20.1 && ${python} setup.py install > /dev/null 2>&1
if  [ $? -eq 0 ];then
        echo -n "安装成功!------"
elif [ $? -ne 0 ];then
        echo -n "安装失败!"
                exit 1
fi

tar xf  ${pwd}/PyJWT-1.7.0.tar.gz -C ${pwd}
cd ${pwd}/PyJWT-1.7.0 && ${python} setup.py install > /dev/null 2>&1
if  [ $? -eq 0 ];then
        echo -n "安装成功!------"
elif [ $? -ne 0 ];then
        echo -n "安装失败!"
                exit 1
fi

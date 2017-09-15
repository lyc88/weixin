package com.tairun.utils;

import org.apache.commons.io.IOUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.InputStream;
import java.util.Properties;

/**
 * Created by lyc on 2017/8/29.
 */
public class PropertiesUtil {
    private static Properties properties;
    private static Logger logger = LoggerFactory.getLogger(PropertiesUtil.class);

    static{
        InputStream is = null;
        try {
            if(properties == null) {
                properties = new Properties();
                is = PropertiesUtil.class.getResourceAsStream("/interface.properties");
                properties.load(is);
            }
        } catch (Exception e) {
            logger.error("读取[confs.properties]配置文件失败");
        }  finally {
            IOUtils.closeQuietly(is);
        }
    }

    public static String getPropsAsString(String key) {
        return properties.getProperty(key);
    }

}

package com.tairun.dao;

import com.tairun.model.LsUser;

public interface LsUserMapper {
    int deleteByPrimaryKey(String id);

    int insert(LsUser record);

    int insertSelective(LsUser record);

    LsUser selectByPrimaryKey(String id);

    int updateByPrimaryKeySelective(LsUser record);

    int updateByPrimaryKey(LsUser record);
}
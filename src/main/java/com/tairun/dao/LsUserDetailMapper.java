package com.tairun.dao;

import com.tairun.model.LsUserDetail;

public interface LsUserDetailMapper {
    int deleteByPrimaryKey(String userId);

    int insert(LsUserDetail record);

    int insertSelective(LsUserDetail record);

    LsUserDetail selectByPrimaryKey(String userId);

    int updateByPrimaryKeySelective(LsUserDetail record);

    int updateByPrimaryKey(LsUserDetail record);
}
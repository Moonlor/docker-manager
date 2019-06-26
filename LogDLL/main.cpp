#include "EncryptString.h"
#include "stdafx.h"

#include <iostream>
#include <cstdio>
#include <assert.h>

using namespace std;

//º∆À„md5
void __stdcall getMd5(const char* m_sourceStr, char* o_dstStr)
{
	assert(m_sourceStr != NULL && o_dstStr != NULL);
	string str = "2333333333333";
	int len = strlen(str.c_str());
	strcpy_s(o_dstStr, len + 1, str.c_str());
}
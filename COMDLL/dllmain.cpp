// dllmain.cpp: DllMain 的实现。

#include "stdafx.h"
#include "resource.h"
#include "COMDLL_i.h"
#include "dllmain.h"

CCOMDLLModule _AtlModule;

// DLL 入口点
extern "C" BOOL WINAPI DllMain(HINSTANCE hInstance, DWORD dwReason, LPVOID lpReserved)
{
	hInstance;
	return _AtlModule.DllMain(dwReason, lpReserved);
}


//HRESULT CCOMDLLModule::DllCanUnloadNow()
//{
//	// TODO: 在此添加专用代码和/或调用基类
//	return CAtlDllModuleT::DllCanUnloadNow();
//}

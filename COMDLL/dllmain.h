// dllmain.h: 模块类的声明。
#include <ctime>

class CCOMDLLModule : public ATL::CAtlDllModuleT< CCOMDLLModule >
{
public :
	DECLARE_LIBID(LIBID_COMDLLLib)
	DECLARE_REGISTRY_APPID_RESOURCEID(IDR_COMDLL, "{b14dc082-1fe5-406f-832b-eb9f026fd948}")

	STDMETHODIMP UnixTimestamp(char* timestamp)
	{
		unsigned long t = std::time(nullptr);

		*timestamp = t;

		return S_OK;
	}
};

extern class CCOMDLLModule _AtlModule;

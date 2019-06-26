#ifndef _EncryptString_h
#define _EncryptString_h

#ifdef ENCRYPT_EXPORTS  
#define ENCRYPT_EXPORTS __declspec(dllexport)  
#else  
#define ENCRYPT_EXPORTS __declspec(dllimport)  
#endif

#ifdef __cplusplus
extern "C" {
#endif
	ENCRYPT_EXPORTS void __stdcall getMd5(const char* m_sourceStr, char* o_dstStr);
#ifdef __cplusplus
}
#endif

#endif
#pragma once

#include <string>
#include <msclr/marshal.h>

using namespace System;

namespace CLRLib {
	public ref class GetString
	{
		public:
			System::String^ getStringFromCpp()
			{
				const char *str = "Hello     World";
				return msclr::interop::marshal_as<System::String^>(str);
			}
	};
}

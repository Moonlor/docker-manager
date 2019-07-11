#pragma once

#ifndef MATH_HPP
#define MATH_HPP

#include <iostream>
#include "jwt/jwt.hpp"

extern "C"
{
	__declspec(dllexport) int __stdcall math_add(int a, int b) {
		return a + b;
	}

	__declspec(dllexport) void __stdcall checkSecret(const char* enc_str, const char* key, char* out) {

		using namespace jwt::params;

		// auto key = "secret"; //Secret to use for the algorithm
		//Create JWT object
		// jwt::jwt_object obj{ algorithm("HS256"), payload({{"some", "payload"}}), secret(key) };

		//Get the encoded string/assertion
		// auto enc_str = obj.signature();
		// std::cout << enc_str << std::endl;

		//Decode
		auto dec_obj = jwt::decode(enc_str, algorithms({ "hs256" }), secret(key));
		std::cout << dec_obj.secret << std::endl;
		int len = strlen(dec_obj.secret.c_str());
		strcpy_s(out, len + 1, dec_obj.secret.c_str());
	}

}
#endif


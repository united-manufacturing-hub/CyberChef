/**
 * JWT Sign tests
 *
 * @author gchq77703 []
 *
 * @copyright Crown Copyright 2018
 * @license Apache-2.0
 */
import TestRegister from "../../lib/TestRegister.mjs";

const inputObject = JSON.stringify({
    String: "SomeString",
    Number: 42,
    iat: 1
}, null, 4);

const hsKey = "secret_cat";
const rsKey = `-----BEGIN PRIVATE KEY-----
MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQCmryZneLbXBKhX
7iG05dpCDQbyKv2zfNz+D24MfjiWYzAq5MzWkb1A2tJL+JISDQaM1sAUjUF4s2t7
Olpl/Px98nS+ky9yrYO75qzqyf8Sj7BMSheHwM4sIo2GrJge30JF8dagmwKahdur
viYBYmhlXIRpZPpptPZmlh37JMYYlA1GgxiyXxwbr4x6nKLYna4Y4lOjCBFRTAw+
0c6nyF4MKrFXlJn5AXYi+26XjdgUzunhmsnza87cZzIxdg5DAb+dl70vDTJ9Ej+k
F1EevkVg7FUwNh+upRaNlbmHGn3aHlskeZ2yJOczqoynkcaI0atrOhVKSviDKp0c
fdVRUXUlAgMBAAECggEAE5uoE2T+cUXhfdKMEYk2hy2cIxHOnXYzUwnCouKYSoyp
hmo69ITZdA8pzPkVSd1RZ3D90I0bZhUJMEpZhwTfOPu0IxUScFWcGRcWQVp40Jip
nxfaM8SJHGUGLBESphMSa0L7QhJqGH5lrIrmUqRebooXI4TW9mds0v2W0kvtp8dW
D9Zuy7H4PmWpez0wWh+x6O0wbMPD5ZaZqTTyziVXLeDIUQS818CAKayDLsEolIev
bQ6Nnajkjs09sAsaLQzMQjhrKdL1Uw6pPlGqBBXDQ1j3qTf/DT/BxOukr94A4h4E
84RmehYMvlUZJ8q69J17mI0iS43l3gSANi8Gz7DOkwKBgQDg3L8DPfEJwV2va27c
ur8YhsyRLl9LufIeu0EwT3aR8T+XRizbZvrg52oycMkgtHgR67AUisMfRWt/xHnv
HbpnypJIIShPkqwyDEyuZdqJ3FLvy9oWFgN8O2qVTa+xXgyH8j+l10Vjgi3KlBrx
oze+DJt4GAvKa1/7ENWsS8/6JwKBgQC9xAT65wwqnTMJNazdsvH97rFRKLpZVCBS
9skNJkpIMBrcpNZOxFIyAgyQ5ny/jieG3TIg5824QAHfpH7LtgYInH3VAsyf5+Rf
4KXqXz3GZ+KZEhZDXbsFb9t+bW1/KTU0FucrdQvzDYW9nQ5f5sP5sBUUrljViTGU
dU9NPebh0wKBgQDfhjAOzfUciG5ToYz7uFubyuvxadJrGXV4XRZJKsSoANQA0U5n
7y92gDQN3hXg/+TXk51eXi3mmQBqaun262tQH4tYTjWfHCM2QQm81xztq+l52/93
svxV805ZCnea7e2w+fuRJLQiXdadKKq8B06zCh9Fu0mFN0Wa8rok4tvkQwKBgQCe
7NlW38VaswiY//DkQwdTqWGrHLbkNQZVNQUwFA9F4bO9cfdhRB2qb/jiKYX0TzNf
SUTANiId2s025WajaLAo6hagHJYOnYCvo06QuG7eCQbHN1SZ2pfUd9eVTEPVqUc7
dqrnxEDbr0mAgVYWjwc1x3gAN/uB6kIxmQVvJRaFrQKBgHqF4rHuDwqoDDPVso38
h8DOzNGj/584itPXTYuYoFA1/NcfrcY/q5Aw738nmwYUiyBVHSR4L4mlT7NcdmOZ
tf9a5wa9Njnsi52WP+xInTFIiz7nHTvQmW9uP9ZHZIPRsRxSZHi+NZqkI2Ow0dGV
V3PDsSegDxYYBMflFpRz15kI
-----END PRIVATE KEY-----`;

const esKey = `-----BEGIN PRIVATE KEY-----
MIGHAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBG0wawIBAQQgevZzL1gdAFr88hb2
OF/2NxApJCzGCEDdfSp6VQO30hyhRANCAAQRWz+jn65BtOMvdyHKcvjBeBSDZH2r
1RTwjmYSi9R/zpBnuQ4EiMnCqfMPWiZqB4QdbAd0E7oH50VpuZ1P087G
-----END PRIVATE KEY-----`;

const es384Key = `-----BEGIN EC PRIVATE KEY-----
MIGkAgEBBDCLj8b09WonXCNmaLTSVC/vIgCayJycjSKRtJnNejKc+CiueET9v69N
UOzmvigQmjqgBwYFK4EEACKhZANiAASMejOFjnhsmEx7wPTHJC0TquNHlfR+kZZl
Rxlcmp9bqEtSKyal9t7UeohNqzH2N9CMw2ABqA1SCcszPpwmibCvCliZP+Rcsl/Q
NLNFC3uKy4PHm+8P+7p/hOOEWj/EgsY=
-----END EC PRIVATE KEY-----`;

const es512Key = `-----BEGIN EC PRIVATE KEY-----
MIHcAgEBBEIAjdUL3lDV9DOU341UXYyaXMmf6NjXYFOf42HOJ+UCoezvt3j5xvtX
ObGh0c7iD21GUoY1EEJj3ghGVu1UwD3CBAugBwYFK4EEACOhgYkDgYYABADIqy6I
HqKnAre/rWEcsLGo6uv36F+0Y/ixB1viVZmuIPG3XvE0fi3+OwVBQ6NzVVF1P8UL
k0bcN7kmX/DSpjqOcQGtxOz3r8oQ3LVIvmssBR/TC8KQqJWdd2N8edIVM/BCrzYU
NZBVA6BQ18/KR0DKk4kLEH+hE5uCcZqrJrvv/i9nfg==
-----END EC PRIVATE KEY-----`;

TestRegister.addTests([
    {
        name: "JWT Sign: HS256",
        input: inputObject,
        expectedOutput: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJTdHJpbmciOiJTb21lU3RyaW5nIiwiTnVtYmVyIjo0MiwiaWF0IjoxfQ.0ha6-j4FwvEIKPVZ-hf3S_R9Hy_UtXzq4dnedXcUrXk",
        recipeConfig: [
            {
                op: "JWT Sign",
                args: [hsKey, "HS256", "{}"],
            }
        ],
    },
    {
        name: "JWT Sign: HS256 with custom header",
        input: inputObject,
        expectedOutput: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImN1c3RvbS5rZXkifQ.eyJTdHJpbmciOiJTb21lU3RyaW5nIiwiTnVtYmVyIjo0MiwiaWF0IjoxfQ.kXln8btJburfRlND8IDZAQ8NZGFFZhvHyooHa6N9za8",
        recipeConfig: [
            {
                op: "JWT Sign",
                args: [hsKey, "HS256", `{"kid":"custom.key"}`],
            }
        ],
    },
    {
        name: "JWT Sign: HS384",
        input: inputObject,
        expectedOutput: "eyJhbGciOiJIUzM4NCIsInR5cCI6IkpXVCJ9.eyJTdHJpbmciOiJTb21lU3RyaW5nIiwiTnVtYmVyIjo0MiwiaWF0IjoxfQ._bPK-Y3mIACConbJqkGFMQ_L3vbxgKXy9gSxtL9hA5XTganozTSXxD0vX0N1yT5s",
        recipeConfig: [
            {
                op: "JWT Sign",
                args: [hsKey, "HS384", "{}"],
            }
        ],
    },
    {
        name: "JWT Sign: HS512",
        input: inputObject,
        expectedOutput: "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJTdHJpbmciOiJTb21lU3RyaW5nIiwiTnVtYmVyIjo0MiwiaWF0IjoxfQ.vZIJU4XYMFt3FLE1V_RZOxEetmV4RvxtPZQGzJthK_d47pjwlEb6pQE23YxHFmOj8H5RLEdqqLPw4jNsOyHRzA",
        recipeConfig: [
            {
                op: "JWT Sign",
                args: [hsKey, "HS512", "{}"],
            }
        ],
    },
    {
        name: "JWT Sign: ES256",
        input: inputObject,
        expectedOutput: inputObject,
        recipeConfig: [
            {
                op: "JWT Sign",
                args: [esKey, "ES256", "{}"],
            },
            {
                op: "JWT Decode",
                args: []
            }
        ],
    },
    {
        name: "JWT Sign: ES384",
        input: inputObject,
        expectedOutput: inputObject,
        recipeConfig: [
            {
                op: "JWT Sign",
                args: [es384Key, "ES384", "{}"],
            },
            {
                op: "JWT Decode",
                args: []
            }
        ],
    },
    {
        name: "JWT Sign: ES512",
        input: inputObject,
        expectedOutput: inputObject,
        recipeConfig: [
            {
                op: "JWT Sign",
                args: [es512Key, "ES512", "{}"],
            },
            {
                op: "JWT Decode",
                args: []
            }
        ],
    },
    {
        name: "JWT Sign: RS256",
        input: inputObject,
        expectedOutput: inputObject,
        recipeConfig: [
            {
                op: "JWT Sign",
                args: [rsKey, "RS256", "{}"],
            },
            {
                op: "JWT Decode",
                args: []
            }
        ],
    },
    {
        name: "JWT Sign: RS384",
        input: inputObject,
        expectedOutput: inputObject,
        recipeConfig: [
            {
                op: "JWT Sign",
                args: [rsKey, "RS384", "{}"],
            },
            {
                op: "JWT Decode",
                args: []
            }
        ],
    },
    {
        name: "JWT Sign: RS512",
        input: inputObject,
        expectedOutput: inputObject,
        recipeConfig: [
            {
                op: "JWT Sign",
                args: [rsKey, "RS512", "{}"],
            },
            {
                op: "JWT Decode",
                args: []
            }
        ],
    }
]);

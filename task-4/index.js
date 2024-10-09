
const URI_DATA = "https://test-share.shub.edu.vn/api/intern-test";

async function fetchInput() {
    try {
        const response = await fetch(`${URI_DATA}/input`);
        const data = await response.json();
        return data;
    } catch (err) {
        throw err;
    }
}

async function sendOutput(data, token) {
    try {
        const response = await fetch(`${URI_DATA}/output`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        const result = await response.json();
        return result;
    } catch (err) {
        throw err;
    }
}

function getPrefixSum(arr) {
    const prefixSum = [0];
    const prefixSumEvenOdd = [0];

    arr.forEach((element, index) => {
        prefixSum.push(prefixSum[index] + element);
        const sign = index & 1 ? -1 : 1;
        prefixSumEvenOdd.push(prefixSumEvenOdd[index] + element * sign);
    });
    return { prefixSum, prefixSumEvenOdd };
}

async function solve() {
    try {
        const { data: array, query, token } = await fetchInput();
        const { prefixSum, prefixSumEvenOdd } = getPrefixSum(array);

        const result = query.map((element) => {
            const { type, range: [l, r] } = element;
            if (type === "1") {
                return prefixSum[r + 1] - prefixSum[l];
            } else {
                if (l & 1) {
                    return - prefixSumEvenOdd[r + 1] + prefixSumEvenOdd[l];
                }
                return prefixSumEvenOdd[r + 1] - prefixSumEvenOdd[l];
            }
        })

        const resp = await sendOutput(result, token);
        console.log(resp);
    } catch (err) {
        console.log(`Err: ${err}`);
    }
}
solve();

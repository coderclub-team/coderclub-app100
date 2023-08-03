"use strict";
// BEGIN: ed8c6549bwf9
if (amount <= 0)
    return res.status(400).json({ message: "Invalid amount" });
// END: ed8c6549bwf9
// BEGIN: 5f3a8c7d
if (amount < 0)
    return res.status(400).json({ message: "Amount cannot be negative" });
// END: 5f3a8c7d

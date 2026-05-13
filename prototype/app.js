// === SAMPLE DATA ===
const customers = [
    {
        id: 1,
        name: "Trần Văn Hoàng",
        phone: "0912345678",
        cccd: "001099012345",
        cif: "1234567890",
        email: "tran.hoang@gmail.com",
        segment: "Priority",
        branch: "CN Láng Hạ"
    },
    {
        id: 2,
        name: "Nguyễn Thị Hoa",
        phone: "0987654321",
        cccd: "001099067890",
        cif: "1234567891",
        email: "nguyen.hoa@gmail.com",
        segment: "Affluent",
        branch: "CN Láng Hạ"
    },
    {
        id: 3,
        name: "Lê Minh Tuấn",
        phone: "0909123456",
        cccd: "038099012345",
        cif: "9876543210",
        email: "le.tuan@company.com",
        segment: "Mass",
        branch: "CN Hoàn Kiếm"
    },
    {
        id: 4,
        name: "Phạm Thị Mai",
        phone: "0918765432",
        cccd: "001085034567",
        cif: "5678901234",
        email: "pham.mai@outlook.com",
        segment: "Priority",
        branch: "CN Cầu Giấy"
    },
    {
        id: 5,
        name: "Vũ Đức Anh",
        phone: "0933456789",
        cccd: "001090078901",
        cif: "3456789012",
        email: "vu.anh@business.vn",
        segment: "Affluent",
        branch: "CN Láng Hạ"
    }
];

// === FUZZY SEARCH ===
function normalizeVietnamese(str) {
    return str
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/đ/g, "d")
        .replace(/Đ/g, "D")
        .replace(/[\s\-\.]/g, "");
}

function normalizePhone(phone) {
    return phone.replace(/[\s\-\.\+]/g, "").replace(/^84/, "0");
}

function fuzzyMatch(query, target) {
    const normalizedQuery = normalizeVietnamese(query);
    const normalizedTarget = normalizeVietnamese(target);
    
    // Exact match
    if (normalizedTarget.includes(normalizedQuery)) {
        return { match: true, type: "exact", score: 100 };
    }
    
    // Fuzzy: check if characters appear in order
    let qi = 0;
    let matchCount = 0;
    for (let ti = 0; ti < normalizedTarget.length && qi < normalizedQuery.length; ti++) {
        if (normalizedTarget[ti] === normalizedQuery[qi]) {
            qi++;
            matchCount++;
        }
    }
    
    if (qi === normalizedQuery.length) {
        const score = Math.round((matchCount / normalizedTarget.length) * 100);
        return { match: true, type: "fuzzy", score: Math.min(score + 30, 95) };
    }
    
    return { match: false, type: null, score: 0 };
}

function searchCustomers(query) {
    if (!query || query.length < 2) return [];
    
    const results = [];
    const normalizedQuery = normalizeVietnamese(query);
    const phoneQuery = normalizePhone(query);
    
    customers.forEach(customer => {
        let bestMatch = { match: false, score: 0, field: "" };
        
        // Search by name
        const nameMatch = fuzzyMatch(query, customer.name);
        if (nameMatch.match && nameMatch.score > bestMatch.score) {
            bestMatch = { ...nameMatch, field: "Tên" };
        }
        
        // Search by phone
        const normalizedPhone = normalizePhone(customer.phone);
        if (normalizedPhone.includes(phoneQuery) && phoneQuery.length >= 3) {
            const score = phoneQuery.length === normalizedPhone.length ? 100 : 85;
            if (score > bestMatch.score) {
                bestMatch = { match: true, type: "exact", score, field: "SĐT" };
            }
        }
        
        // Search by CCCD
        if (customer.cccd.includes(query)) {
            bestMatch = { match: true, type: "exact", score: 100, field: "CCCD" };
        }
        
        // Search by CIF
        if (customer.cif.includes(query)) {
            bestMatch = { match: true, type: "exact", score: 100, field: "CIF" };
        }
        
        // Search by email
        if (customer.email.toLowerCase().includes(query.toLowerCase())) {
            bestMatch = { match: true, type: "exact", score: 90, field: "Email" };
        }
        
        if (bestMatch.match && bestMatch.score >= 50) {
            results.push({ customer, ...bestMatch });
        }
    });
    
    // Sort: exact first, then by score
    results.sort((a, b) => {
        if (a.type === "exact" && b.type !== "exact") return -1;
        if (a.type !== "exact" && b.type === "exact") return 1;
        return b.score - a.score;
    });
    
    return results;
}

// === SEARCH UI ===
const searchInput = document.getElementById("searchInput");
const searchResults = document.getElementById("searchResults");

searchInput.addEventListener("input", function() {
    const query = this.value.trim();
    const results = searchCustomers(query);
    
    if (results.length > 0) {
        searchResults.innerHTML = results.map(r => `
            <div class="search-result-item" onclick="selectCustomer(${r.customer.id})">
                <div class="user-avatar" style="width:32px;height:32px;font-size:11px;background:#4ecdc4;color:#fff;border-radius:50%;display:flex;align-items:center;justify-content:center;">
                    ${r.customer.name.split(' ').slice(-2).map(n => n[0]).join('')}
                </div>
                <div style="flex:1">
                    <div style="font-weight:500;font-size:13px">${r.customer.name}</div>
                    <div style="font-size:11px;color:#999">${r.customer.segment} • ${r.customer.branch} • ${maskPhone(r.customer.phone)}</div>
                </div>
                <span class="result-match-type ${r.type === 'fuzzy' ? 'fuzzy' : ''}">${r.type === 'exact' ? 'Chính xác' : 'Tương tự'} (${r.field})</span>
            </div>
        `).join('');
        searchResults.classList.add("active");
    } else if (query.length >= 2) {
        searchResults.innerHTML = `<div style="padding:16px;text-align:center;color:#999;font-size:13px">Không tìm thấy kết quả</div>`;
        searchResults.classList.add("active");
    } else {
        searchResults.classList.remove("active");
    }
});

searchInput.addEventListener("blur", function() {
    setTimeout(() => searchResults.classList.remove("active"), 200);
});

searchInput.addEventListener("focus", function() {
    if (this.value.trim().length >= 2) {
        searchResults.classList.add("active");
    }
});

function maskPhone(phone) {
    return phone.substring(0, 4) + " *** " + phone.substring(7);
}

function selectCustomer(id) {
    searchResults.classList.remove("active");
    searchInput.value = "";
    // In a real app, this would navigate to the customer's 360 page
    alert("Mở Customer 360 cho KH ID: " + id + "\n(Trong prototype, trang hiện tại đã hiển thị mẫu Customer 360)");
}

// === FILTER BUTTONS ===
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        this.parentElement.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
    });
});

// === NAV ITEMS ===
document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelectorAll('.nav-item').forEach(i => i.classList.remove('active'));
        this.classList.add('active');
    });
});

// === ANIMATE ON LOAD ===
document.addEventListener('DOMContentLoaded', function() {
    const widgets = document.querySelectorAll('.widget');
    widgets.forEach((widget, index) => {
        widget.style.opacity = '0';
        widget.style.transform = 'translateY(20px)';
        setTimeout(() => {
            widget.style.transition = 'all 0.4s ease';
            widget.style.opacity = '1';
            widget.style.transform = 'translateY(0)';
        }, 100 + index * 80);
    });
});

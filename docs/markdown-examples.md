# 莫队

## 普通莫队

​	普通莫队是一个基于分块的离线解决静态区间询问问题的算法。

​	设询问区间为 $[l_i,r_i]$。对原序列索引分块。将询问区间离线后以 $l_i$ 所在块的编号为第一关键字，$r_i$ 为第二关键字升序。

### 算法流程：

​	对于每个询问 $[l_i,r_i]$ 的答案，由 $[l_1,r_1]$ 扩展而来，每次用 while 循环暴力移动 $l,r$ 指针。

​	此时，升序后的 $[l_i,r_i]$，同一块内的 $l_i$ 对应的询问 $[l_i,r_i]$ 视作一个整体，共有 $\frac nt$ 个块。在一个块内的 $r$ 最多移动 $n$ 次（因为同一块内的 $r$ 升序，最多从 $1$ 移动到 $n$。在同一个块内 $l$ 每次扩展最多移动 $t$ 次。同时，从一个块的右端点询问的 $l$ 向下一个块的左端点的 $l$ 扩展时，$l$ 最多移动 $2t$，$r$ 最多移动 $n$。

### 时间复杂度分析：

​	综上：处理完 $m$ 个询问，$l,r$ 指针的总移动次数为：$O(\frac{n^2}{t}+mt)$。

​	当 $t=\frac{n}{\sqrt m}$ 时，时间复杂度最优为：$O(n\sqrt m)$。

​	认为 $n,m$ 同阶，所以直接取 $\sqrt n$。

​	上述只是考虑了指针移动次数。每次指针移动都要一次更新操作的时间复杂度。但是具体时间复杂度仍与修改的时间复杂度相关，上述时间复杂度为假设修改的时间复杂度为 $O(1)$ 时的最优。

### 优化：

​	奇偶化排序：对奇数块内的询问的 $r$ 进行升序，对偶数块内的询问的 $r$ 进行降序。

​	这是很自然的，因为按原本的排序方式，每次进入一个新块时，$r$ 都会从最大值降到最小值，再又升到最大值。这当然是不优的。

```c++
bool cmp(node x, node y) {
	return (kind[x.l] ^ kind[y.l]) ? kind[x.l] < kind[y.l] : ((kind[x.l] & 1) ? x.r<y.r: x.r>y.r);
}
void add(int x) {
	/*
	将 a[x] 加入答案
	*/
}
void del(int x) {
	/*
	将 a[x] 删去
	*/
}
signed main() {
	For(i, 1, ceil((double)n / sqrt(n))) For(j, (i - 1) * sqrt(n) + 1, i * sqrt(n)) kind[j] = i;
	sort(q + 1, q + 1 + m, cmp);
	int l = 1, r = 0;
	For(i, 1, m) {
		while (q[i].l < l) add(--l);
		while (q[i].l > l) del(l++);
		while (q[i].r < r) del(r--);
		while (q[i].r > r) add(++r);
		/*
		ans[q[i].id] = ...
		*/
	}
	return 0;
}

```

## 带修莫队

### 	算法流程：

​	带修莫队与普通莫队相比，多了一维时间轴表示每修改一次，时间增加 $1$。

​	在修改时。

### 时间复杂度分析：

​	认为序列大小 $n$，询问次数 $m$，修改次数 $t$ 同阶，块长取 $n^{\frac{3}{2}}$ 时，时间复杂度最优，为 $O(n^{\frac{5}{3}})$。

​	但是具体时间复杂度仍与修改和查询答案的时间复杂度相关，上述时间复杂度为假设修改和查询答案的时间复杂度均为 $O(1)$ 时的最优。

```c++
struct node {
	int id, l, r, t;
	int get(int x) {return x / len;}
	bool operator <(const node &x) {
		int al = get(l), ar = get(r), bl = get(x.l), br = get(x.r);
		if (al != bl) return al < bl;
		if (ar != br) return ar < br;
		return t < x.t;
	}
} q[N];
void add(int x) {
	/*
	将 a[x] 加入答案
	*/
}
void del(int x) {
	/*
	将 a[x] 删去
	*/
}
signed main() {
	For(i, 1, m) {
		string op;
		cin >> op;
		if (opt[0] == 'Q') {
			int l, r;
			cin >> l >> r;
			q[++cnt] = {cnt, l, r, t};
		}
		else {
			int x, v;
			cin >> x >> v;
			c[++t] = {x, v}; // 将 a[x] 修改为 v
		}
	}
	len = cbrt((double)n * n) + 1;
	sort(q + 1, q + 1 + cnt);
	l = 1, r = 0, t = 0;
	For(i, 1, cnt) {
		while (q[i].l < l) add(a[--l]);
		while (q[i].l > l) del(a[l++]);
		while (q[i].r < r) del(a[r--]);
		while (q[i].r > r) add(a[++r]);
		while (t < q[i].t) {
			t++;
			if (c[t].fi >= l && c[t].fi <= r) {
				del(a[c[t].fi]);
				add(c[t].se);
			}
			swap(a[c[t].fi], c[t].se);
		}
		while (t > q[i].t) {
			if (c[t].fi >= l && c[t].fi <= r) {
				del(a[c[t].fi]);
				add(c[t].se);
			}
			swap(a[c[t].fi], c[t].se);
			t--;
		}
		/*
		ans[q[i].id] = ...;
		*/
	}
	return 0;
}
```



## 回滚莫队

​	回滚莫队用于 add 容易维护，del 不易维护的问题，可以将 del 操作转换成 add 操作。

### 算法流程：

​	在普通莫队中，处理 $l_i$ 位于同一块内的询问时：

- 若 $r_i$ 也在 $l_i$ 的块内，询问区间长度 $\le t$，直接暴力处理。
- 若 $r_i$ 不在 $l_i$ 的块内，按 $r_i$ 升序 add，对于相同的 $r_i$ 的不同 $l_i$，因为 $l_i$ 在同一块内，所以直接重新从 $l_i$ 所在块的右边界 add 过去。

​	这样实现时，不同块的 $l_i$ 的询问之间就独立了，进入下一个块时，要清空维护的信息。

### 时间复杂度分析：

​	时间复杂度与普通莫队一致。

```c++
int len;
int get(int x) {return x / len;}
struct node {
	int id, l, r;
	bool operator<(const node &y) const {
		if (get(l) != get(y.l)) return get(l) < get(y.l);
		return r < y.r;
	}
} q[N];
void add(int x) {
	/*
	将 a[x] 加入答案
	*/
}
void del(int x) {
	/*
	将 a[x] 删去
	*/
}
signed main() {
	len = sqrt(n);
	sort(q + 1, q + 1 + m);
	i = 1;
	while (i <= m) {
		j = i;
		while (j <= m && get(q[i].l) == get(q[j].l)) j++;
		int right = get(q[i].l) * len + len - 1;
		while (i < j && q[i].r <= right) {
			res = 0;
			For(k, q[i].l, q[i].r) add(a[k]);
			/*
			ans[q[i].id] = ...;
			*/
			For(k, q[i].l, q[i].r) del(a[k]);
			i++;
		}
		res = 0, l = right + 1, r = right;
		while (i < j) {
			while (r < q[i].r) add(a[++r]);
			last = res;
			while (l > q[i].l) add(a[--l]);
			/*
			ans[q[i].id] = ...;
			*/
			while (l < right + 1) del(a[l++]);
			res = last;
			i++;
		}
		/*
		清空信息
		*/
	}
	return 0;
}
```



## 树上莫队

​	树上莫队就是莫队上树，询问树上路径信息，因为莫队通过 add 和 del 维护信息，所以在括号序上跑莫队即可。括号序会通过一次 add 和一次 del 将树上两点的 LCA 的祖先信息去掉。

### 算法流程：

与其它莫队一致。

### 时间复杂度分析：

与其它莫队一致。

```c++
int len;
int get(int x) {
	return x / len;
}
struct node {
	int id, l, r, p;
	bool operator<(node &y) const {
		int i = get(l), j = get(y.l);
		if (i != j) return i < j;
		return r < y.r;
	}
} q[N];
void add(int x) {
	vis[x] ^= 1;
	//每个点只被考虑一次，在区间内第一次出现时对应 add 操作，第二次出现时就对应 del 操作
	if (!vis[x]) {
		/*
		将 a[x] 删去
		*/
	}
	else {
		/*
		将 a[x] 加入答案
		*/
	}
}
signed main() {
	For(i, 1, m) {
		u = read(), v = read();
		if (fi[u] > fi[v]) swap(u, v);
		LCA = Lca(u, v);
		if (u == LCA) q[i] = {i, fi[u], fi[v]};
		else q[i] = {i, se[u], fi[v], LCA};
	}
	len = sqrt(idx);
	sort(q + 1, q + 1 + m);
	L = 1, R = 0, res = 0;
	For(i, 1, m) {
		//因为维护括号序，所以是 seq
		while (R < q[i].r) add(seq[++R]);
		while (R > q[i].r) add(seq[R--]);
		while (L < q[i].l) add(seq[L++]);
		while (L > q[i].l) add(seq[--L]);
		if (q[i].p) add(p);
		/*
		ans[q[i].id] = ...;
		*/
		if (q[i].p) add(p);
	}
	return 0;
}
```


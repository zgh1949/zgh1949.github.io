在项目的build.gradle中的android标签下加入
```kotlin
    buildFeatures {
        viewBinding = true
    }
```

然后就可以使用binding了
```kotkin
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        val binding = FirstLayoutBinding.inflate(layoutInflater)
        setContentView(binding.root)
        binding.button1.setOnClickListener {
            Toast.makeText(this, "Click the Button", Toast.LENGTH_SHORT).show();
        }
    }
```

**原理**
开启viewBinding后，会为每一个layout文件生成一个同名+Binding后缀的对象，可以使用该对象操作layout的所有元素，不用再使用findXX函数了
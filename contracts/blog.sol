// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity >=0.7.0 <0.9.0;

import "@openzeppelin/contracts/utils/Counters.sol";

contract Blog {
    using Counters for Counters.Counter;

    Counters.Counter private blogId;

    struct blog {
        uint256 _blogId;
        string _title;
        string _blogUrl;
        string _category;
    }

    mapping(uint256 => blog) idToBlog;

    event createdBlog(uint256 blogId, string title, string indexed category);

    function createBlog(
        string memory title,
        string memory _blogUrl,
        string memory category
    ) public returns (uint256) {
        blogId.increment();
        uint256 currentBlogId = blogId.current();
        idToBlog[currentBlogId] = blog(
            currentBlogId,
            title,
            _blogUrl,
            category
        );
        emit createdBlog(currentBlogId, title, category);
        return currentBlogId;
    }

    function getBlogById(uint256 blogId_) public view returns(blog memory){
        return idToBlog[blogId_];
    }

    function getAllBlogs() public view returns (blog[] memory) {
        uint256 blogCount = blogId.current();
        blog[] memory blogs = new blog[](blogCount);
        uint256 currentIndex = 0;

        for (uint i = 0; i < blogCount; i++) {
            blog storage currentBlog = idToBlog[currentIndex + 1];
            blogs[currentIndex] = currentBlog;
            currentIndex += 1;
        }
        return blogs;
    }
}

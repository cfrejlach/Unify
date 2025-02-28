# -*- encoding: utf-8 -*-
# stub: grpc 1.36.0 x64-mingw32 src/ruby/lib src/ruby/bin src/ruby/pb

Gem::Specification.new do |s|
  s.name = "grpc".freeze
  s.version = "1.36.0"
  s.platform = "x64-mingw32".freeze

  s.required_rubygems_version = Gem::Requirement.new(">= 0".freeze) if s.respond_to? :required_rubygems_version=
  s.require_paths = ["src/ruby/lib".freeze, "src/ruby/bin".freeze, "src/ruby/pb".freeze]
  s.authors = ["gRPC Authors".freeze]
  s.bindir = "src/ruby/bin".freeze
  s.date = "2021-02-23"
  s.description = "Send RPCs from Ruby using GRPC".freeze
  s.email = "grpc-io@googlegroups.com".freeze
  s.homepage = "https://github.com/google/grpc/tree/master/src/ruby".freeze
  s.licenses = ["Apache-2.0".freeze]
  s.required_ruby_version = Gem::Requirement.new([">= 2.4".freeze, "< 3.1.dev".freeze])
  s.rubygems_version = "3.3.17".freeze
  s.summary = "GRPC system in Ruby".freeze

  s.installed_by_version = "3.3.17" if s.respond_to? :installed_by_version

  if s.respond_to? :specification_version then
    s.specification_version = 4
  end

  if s.respond_to? :add_runtime_dependency then
    s.add_runtime_dependency(%q<google-protobuf>.freeze, ["~> 3.14"])
    s.add_runtime_dependency(%q<googleapis-common-protos-types>.freeze, ["~> 1.0"])
    s.add_development_dependency(%q<bundler>.freeze, [">= 1.9"])
    s.add_development_dependency(%q<facter>.freeze, ["~> 2.4"])
    s.add_development_dependency(%q<logging>.freeze, ["~> 2.0"])
    s.add_development_dependency(%q<simplecov>.freeze, ["~> 0.14.1"])
    s.add_development_dependency(%q<rake>.freeze, ["~> 13.0"])
    s.add_development_dependency(%q<rake-compiler>.freeze, ["~> 1.1"])
    s.add_development_dependency(%q<rake-compiler-dock>.freeze, ["~> 1.0"])
    s.add_development_dependency(%q<rspec>.freeze, ["~> 3.6"])
    s.add_development_dependency(%q<rubocop>.freeze, ["~> 0.49.1"])
    s.add_development_dependency(%q<signet>.freeze, ["~> 0.7"])
    s.add_development_dependency(%q<googleauth>.freeze, [">= 0.5.1", "< 0.10"])
  else
    s.add_dependency(%q<google-protobuf>.freeze, ["~> 3.14"])
    s.add_dependency(%q<googleapis-common-protos-types>.freeze, ["~> 1.0"])
    s.add_dependency(%q<bundler>.freeze, [">= 1.9"])
    s.add_dependency(%q<facter>.freeze, ["~> 2.4"])
    s.add_dependency(%q<logging>.freeze, ["~> 2.0"])
    s.add_dependency(%q<simplecov>.freeze, ["~> 0.14.1"])
    s.add_dependency(%q<rake>.freeze, ["~> 13.0"])
    s.add_dependency(%q<rake-compiler>.freeze, ["~> 1.1"])
    s.add_dependency(%q<rake-compiler-dock>.freeze, ["~> 1.0"])
    s.add_dependency(%q<rspec>.freeze, ["~> 3.6"])
    s.add_dependency(%q<rubocop>.freeze, ["~> 0.49.1"])
    s.add_dependency(%q<signet>.freeze, ["~> 0.7"])
    s.add_dependency(%q<googleauth>.freeze, [">= 0.5.1", "< 0.10"])
  end
end
